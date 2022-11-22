var dtable;
$(document).ready(function () {
    dtable = $('#myTable').dataTable({
        "ajax": { "url": "/Admin/Product/AllProducts" },
        "columns": [
            
            { "data": "name" },
            { "data": 'description' },
            { "data": "price" },
            { "data": "category.name" },
            {
                "data": "id",
                "render": function (data) {
                    return `
                        < a href = "/Admin/Product/CreateUpdate?id=${data}"><i class="bi bi-pencil-square"></i>Edit</a >
                            <a onclick=RemoveProduct("/Admin/Product/Delete/${data}")><i class="bi bi-trash"></i>Delete</a > `
                }
            }
        ]
    });
});
function RemoveProduct(url) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You wont be able to revert this",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it'
    }).then((result) => {
        $.ajax({
            url: url,
            type: 'Delete',
            success: function (data) {
                if (data.success) {
                    dtable.ajax.reload();
                    toastr.success(data.message);
                }
                else {
                    toastr.error(data.message);
                }
            }
        });
    })


}