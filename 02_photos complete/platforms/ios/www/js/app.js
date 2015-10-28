
var app = {

    platform: null,
    osVersion: null,

    images: [],

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener("pause", this.saveData.bind(this), false);
    },

    saveData: function() {
        var data = JSON.stringify(this.images);
        localStorage.setItem("images", data);
    },

    onDeviceReady: function() {
        this.platformGating();
        if (localStorage.data) {
            try {
                this.images = JSON.parse( localStorage.getItem("images") );
                this.ui.updateList();
            } catch(err) { app.images = []; }
        }
        this.ui.init();
    },

    platformGating: function() {
        if (device) {
            this.platform = device.platform;
            this.osVersion = device.version;

            if (this.platform == "iOS") {
                document.body.classList.add("ios");
            }

        } else {
            console.warn("Cordova Plugin Device not loaded!");
        }
    },

    ui: {

        init: function() {
            document.getElementById("camera").addEventListener("click", this.openCamera.bind(this));
            this.imageList = document.getElementById("imageList");
            this.imagePreview = document.getElementById("imagePreview");
            this.imagePreview.addEventListener("click", this.hidePreview.bind(this));
        },

        openCamera: function(e) {
            e.preventDefault();
            navigator.notification.confirm(
                "Choose the source of the image:",
                this.getPictureFromSource.bind(this),
                "Pick Image",
                ["Camera", "Photo library", "Saved photos", "Cancel"]
            );
        },

        getPictureFromSource: function(choice) {

            var source = Camera.PictureSourceType.CAMERA;

            switch (choice) {
                case 2: source = Camera.PictureSourceType.PHOTOLIBRARY; break;
                case 3: source = Camera.PictureSourceType.SAVEDPHOTOALBUM; break;
                case 4: return;
            }

            var options = {
                quality : 30,
                destinationType : Camera.DestinationType.FILE_URI,
                sourceType : source,
                allowEdit : true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 1200,
                targetHeight: 1200,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            navigator.camera.getPicture(
                this.processCameraResults.bind(this),
                this.handleCameraError.bind(this),
                options
            );

        },

        processCameraResults: function(tmpPath) {
            function errorHandleFiles(err) {
                navigator.notification.alert(
                    "Can't store image",
                    function() {},
                    "File System Error",
                    'Cancel'
                );
            }

            console.log("Starting");

            window.requestFileSystem(window.PERSISTENT, 10*1024*1024, function(fs){
                // get image from camera
                window.resolveLocalFileSystemURL(tmpPath, function(imageFile) {

                    console.log(fs, imageFile);

                    var ts = Math.round( Date.now()/1000 );

                    imageFile.moveTo(fs.root, "image_"+ts+".jpg", function(newFile){

                        app.images.push({
                            url: newFile.fullPath,
                            name: ts
                        });

                        app.ui.updateList();

                    }, errorHandleFiles);

                }, errorHandleFiles);
            }, errorHandleFiles);
        },

        handleCameraError: function(error) {
            if(error != "no image selected") {
                navigator.notification.alert(
                    error,
                    function() {},
                    "Pick Image Error",
                    'OK'
                );
            }
        },

        imageList: null,

        updateList: function() {
            this.imageList.innerHTML = "";
            console.log("Adding");

            app.images.forEach(function (image, index) {
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.addEventListener("click", this.showPreview.bind(this, index));
                var im = new Image();
                im.src = cordova.file.documentsDirectory+image.url;
                im.alt = "Picture from disk";
                this.imageList.appendChild(li);
                li.appendChild(a);
                a.appendChild(im);
                a.appendChild(document.createTextNode(image.name));
            }.bind(this));
        },

        imagePreview: null,

        showPreview: function(index, e) {
            e.preventDefault();
            var path = cordova.file.documentsDirectory+app.images[index].url;
            this.imagePreview.style.backgroundImage = "url('"+path+"')";
            document.body.classList.add("preview");
        },

        hidePreview: function(e) {
            e.preventDefault();
            document.body.classList.remove("preview");
        }

    }

};
