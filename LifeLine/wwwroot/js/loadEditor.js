tinymce.init({
    selector: "textarea",
    height: 500,
    plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table contextmenu paste imagetools",
        "codesample",
        "uploadimage"
    ],
    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | codesample link image uploadimage",
      upload_image_url: "/api/Image/Up"
})