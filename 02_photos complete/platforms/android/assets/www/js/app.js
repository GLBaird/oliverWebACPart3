
var app = {

    platform: null,
    osVersion: null,


    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.platformGating();
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
                destinationType : Camera.DestinationType.NATIVE_URI,
                sourceType : source,
                allowEdit : true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 200,
                targetHeight: 200,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            navigator.camera.getPicture(
                this.processCameraResults.bind(this),
                this.handleCameraError.bind(this),
                options
            );

        },

        processCameraResults: function(imageData) {
            console.log(imageData);
        },

        handleCameraError: function(error) {
            console.log(error);
        }

    }

};
