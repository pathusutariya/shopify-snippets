jQuery(document).ready(function ($) {

    /* ============================= upload image ============================= */
    /* Todo: Add file list
        - cropper.js
    */

    if ($("#cp-stage-1").length > 0){
        let imageMimeType = "image/jpeg";
        let usedFileInput = false;

        // Support image type
        const supportedImage = ["image/png", "image/jpeg"];
        // Image uploader section
        const imageStage = document.getElementById('cp-stage-1');

        // Maximum file size to upload
        // const maxFileSize = +slideIn.dataset.fileSize;
        const addToCartBtn = document.querySelector('.product-form__submit'); // Add to cart button
        const cropperContainer = document.querySelector('[data-cropper]'); // Cropper space
        const cropperImgElm = cropperContainer.querySelector('[data-cropper-img]'); // Cropper image element
        const imageUpload = document.getElementById('imageUpload'); // input type image uploader

        let imageBlob = ''

        function resetFileInput(field) {
            field.type = "file";
        }

        imageUpload.addEventListener('change', function () {
            $(".cp-slideIn__cropper-controls").addClass('active');
            if (imageUpload.files.length) {
                const fileExt = imageUpload.files[0].name.substr(imageUpload.files[0].name.lastIndexOf('.'))
                const fileNameSpilt = imageUpload.files[0].name.split('.')
                if (!supportedImage.includes(imageUpload.files[0].type) && !supportedImage.includes("." + fileNameSpilt[fileNameSpilt.length - 1])) {
                    // ToDo: Alert here for mime_type popup
                    resetFileInput(imageUpload);
                    return
                }
                imageMimeType = imageUpload.files[0].type;
                console.log('imageUpload:: ', imageUpload.files[0]);
                initCropper(URL.createObjectURL(imageUpload.files[0]));
            }
        });

        // Uploaded file remove button
        const deleteImage = document.getElementById('deleteImage');
        function initCropper(blob) {
            const setImageSrc = document.getElementById('setImg');
            const setOriginalImage = document.querySelector('input[name="properties[Original_image]"]');
            const setImage =  document.querySelector('input[name="properties[Image]"]');
            let upload_bg_set = $(".upload-bg-set");
            if(upload_bg_set) {
                upload_bg_set.addClass('add-bg-url');
                upload_bg_set.css('display', 'block');
                // upload_bg_set.css('background-image', 'url(' + blob + ')');
                // upload_bg_set.find('#setImg').attr('src', blob );
            }
            if(setImageSrc) {
                setImageSrc.src = blob;
                setImageSrc.setAttribute("xlink:href", blob)
                setImageSrc.parentElement.style.display = 'block';
            }
            if(setOriginalImage) {
                setOriginalImage.value = blob;
            }
            deleteImage.style.display = 'inline-block';

            // zooming slider
            const zoomRangeInput = document.getElementById('zoom');
            // parent of zooming slider
            const zoomRangeContainer = document.querySelector('[data-zoom-container]');
            // Show slider maximum number e.g. 100%
            const zoomRangeVal = zoomRangeContainer.querySelector('[data-value]');
            // Editing Done button
            const doneEditImage = document.getElementById('doneEditImage');
            const cropBoxSize = matchMedia('screen and (max-width: 1024px)').matches ? document.body.offsetWidth - 48 : ((document.body.offsetWidth / 2) - 48) / 100 * 40
            cropperImgElm.src = blob;

            const cropper = new Cropper(cropperImgElm, {
                aspectRatio: 1,
                autoCropArea: 1,
                viewMode: 1,
                minCropBoxHeight: (cropBoxSize / 100) * 80,
                minCropBoxWidth: (cropBoxSize / 100) * 80,
                initialAspectRatio: 1,
                dragMode: 'move',
                restore: false,
                center: false,
                guides: false,
                highlight: false,
                cropBoxMovable: false,
                cropBoxResizable: false,
                toggleDragModeOnDblclick: false,
                ready() {
                    cropper.zoomTo(0);
                }
            });
            function updateCroppedImg() {
                cropper.getCroppedCanvas().toBlob((blob) => {
                    imageBlob = blob;
                }, imageMimeType);

                let image_url = cropper.getCroppedCanvas().toDataURL(imageMimeType);
                console.log('image url string:: ', image_url);

                if(setImage && image_url) {
                    fetch(image_url)
                        .then((response)=> {
                            return response.blob();
                        })
                        .then(blob=> {
                            if(blob) {
                                setImage.value = URL.createObjectURL(blob);
                            }
                        });
                }

                if(setImageSrc && image_url) {
                    setImageSrc.src = image_url;
                    setImageSrc.setAttribute("xlink:href", image_url)
                    setImageSrc.parentElement.style.display = 'block';
                }
            }

            function enableEditing() {
                cropper.enable();
                doneEditImage.classList.remove('edit');
                addToCartBtn.classList.remove('active');
                zoomRangeInput.disabled = false;
                doneEditImage.querySelector('.edit').hidden = true;
                doneEditImage.querySelector('.done').hidden = false;
                imageStage.classList.add('cut');
            }

            function disableEditing() {
                cropper.disable();
                doneEditImage.classList.add('edit');
                updateCroppedImg();
                addToCartBtn.classList.add('active');
                zoomRangeInput.disabled = true;
                doneEditImage.querySelector('.edit').hidden = false;
                doneEditImage.querySelector('.done').hidden = true;
                imageStage.classList.remove('cut');
            }

            function deleteImageFunc() {
                if(upload_bg_set){
                    upload_bg_set.removeClass("add-bg-url");
                    upload_bg_set.css('display', 'none');
                    upload_bg_set.css('background-image', 'url()');
                }
                if(setImageSrc){
                    setImageSrc.src = '';
                    setImageSrc.parentElement.style.display = 'none';
                }
                if(setOriginalImage){
                    setOriginalImage.value = '';
                }
                if(setImage) {
                    setImage.value = '';
                }

                deleteImage.style.display = 'none';
                destroy();
                enableEditing();
            }

            function doneEdit() {
                if (doneEditImage.classList.contains('edit')) {
                    enableEditing();
                } else {
                    disableEditing();
                }
            }

            let prevZoomValue = 0;

            function handleZoom() {
                const val = (+zoomRangeInput.value === 0 ? 0 : +zoomRangeInput.value / 100 * 10);
                zoomRangeVal.textContent = ((val * 10) + 100) + "%"

                if (val === 0) cropper.zoomTo(0)
                else cropper.zoom(val > prevZoomValue ? 0.1 : -0.1)
                prevZoomValue = val
            }

            function destroy() {
                resetFileInput(imageUpload);
                cropper.zoomTo(0);
                zoomRangeVal.value = 0
                cropper.destroy();
                doneEditImage.removeEventListener('click', doneEdit);
                zoomRangeInput.removeEventListener('input', handleZoom);
                deleteImage.removeEventListener('click', deleteImageFunc);
                addToCartBtn.removeEventListener('click', enableEditing);
            }

            doneEditImage.addEventListener('click', doneEdit);
            zoomRangeInput.addEventListener('input', handleZoom)
            deleteImage.addEventListener('click', deleteImageFunc)
            addToCartBtn.addEventListener('click', enableEditing)
        }

        function addToCart(e) {
            e.preventDefault();
            addToCartBtn.classList.add('loading');

            // This selector set product form id
            const form = document.querySelector('form#product-form-template--17717650096364__main');
            let formData = new FormData(form);

            if ($('.upload-image-container.upload-bg-set').hasClass('add-bg-url')){
                formData.append('properties[Image]', imageBlob, `img.${imageMimeType.includes('jpeg') ? 'jpg' : 'png'}`);
                html2canvas(document.querySelector(".shape-imageContainer"),{useCORS: true}).then(function(canvas) {
                    /* var link = document.createElement("a");
                    document.body.appendChild(link);
                    link.download = "html_image.png";
                    link.href = canvas.toDataURL("image/png");
                    link.target = '_blank';
                    link.click();*/

                    canvas.toBlob(function(data){
                        formData.append('properties[Final Image]', data, `img.${imageMimeType.includes('jpeg') ? 'jpg' : 'png'}`);
                        addToCartEvent();
                    });
                });
            } else {
                addToCartEvent();
            }

            function addToCartEvent() {
                fetch('/cart/add.js', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: formData,
                }).then(res => res.json())
                    .then((res) => {
                        imageStage.classList.remove('loading');
                        let img_url = '';
                        settings = {
                            moneyFormat : '${{amount}}'
                        };
                        if (res.properties["Final Image"]){
                            img_url = res.properties["Final Image"];
                        } else {
                            img_url = res.image
                        }
                        addToCartBtn.classList.remove('loading');

                        // Open cart
                        document.dispatchEvent(new CustomEvent('ajaxProduct:added', {
                            detail: {
                                product: res,
                                addToCartBtn: addToCartBtn
                            }
                        }));
                    })
            }
        }
        // This selector set product form id
        const formSubmit = document.querySelector('form#product-form-template--17717650096364__main');
        // formSubmit.addEventListener('submit', addToCart, true);
    }
    /* ============================= End upload image ============================= */
});
