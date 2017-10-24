/**
 * tinymce plugin
 * Created by jerry on 16/8/5.
 */
tinymce.PluginManager.add('uploadimage', function (editor) {

    function selectLocalImages() {
        var dom = editor.dom;
        var input_f = $('<input type="file" name="upfiles" accept="image/jpg,image/jpeg,image/png,image/gif" multiple="multiple">');
        input_f.on('change', function () {
            var formData = new FormData();
            var files = input_f[0].files;
            for (var i = 0; i < files.length; i++) {
                formData.append("upfiles", files[i]);
            }

            //var form = $("<form/>",
            //    {
            //        action: editor.settings.upload_image_url, //设置上传图片的路由，配置在初始化时
            //        style: 'display:none',
            //        method: 'post',
            //        enctype: 'multipart/form-data'
            //    }
            //);
            //form.append(input_f);
            //ajax提交表单
            var req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if (req.readyState == 4 && req.status == 200) {
                    var obj = JSON.parse(req.responseText);
                    obj.forEach(function (src) {
                        editor.selection.setContent(dom.createHTML('img', { src: src }));
                    });
                }
            };
            req.overrideMimeType('text/plain; charset=x-user-defined-binary');
            req.open("post", editor.settings.upload_image_url);
            //req.setRequestHeader("accept", "application/json");
            req.send(formData);
            //form.ajaxSubmit({
            //    beforeSubmit: function () {
            //        return true;
            //    },
            //    success: function (data) {
            //        if (data && data.urls) {
            //            editor.focus();
            //            data.urls.forEach(function (src) {
            //                editor.selection.setContent(dom.createHTML('img', { src: src }));
            //            })
            //        }
            //    }
            //});

        });

        input_f.click();
    }

    editor.addCommand("mceUploadImageEditor", selectLocalImages);

    editor.addButton('uploadimage', {
        icon: 'image',
        tooltip: '上传图片',
        onclick: selectLocalImages
    });

    editor.addMenuItem('uploadimage', {
        icon: 'image',
        text: '上传图片',
        context: 'tools',
        onclick: selectLocalImages
    });
});