// Call the dataTables jQuery plugin
$(document).ready(function () {
  $("#dataTable").DataTable();
  $("#dataTableActivity").DataTable();

  $("#dataTable").on("click", ".button-update-category", function () {
    let id = $(this).data("id");
    let name = $(this).data("name");
    $("#edit-modal").modal("show");
    $(".id").val(id);
    $(".name").val(name);
  });

  $("#dataTableActivity").on("click", ".button-update-activity", function () {
    let id = $(this).data("id");
    let name = $(this).data("name");
    let type = $(this).data("type");
    $("#edit-modal").modal("show");
    $(".id").val(id);
    $(".name").val(name);
    $(".type").val(type);
  });

  $("#dataTable").on("click", ".button-update-feature", function () {
    let id = $(this).data("id");
    let name = $(this).data("name");
    let qty = $(this).data("qty");
    $("#edit-feature-modal").modal("show");
    $(".id").val(id);
    $(".name").val(name);
    $(".qty").val(qty);
  });

  $('#dataTable').on('click', '.button-update-bank', function () {
    let id = $(this).data('id');
    let name = $(this).data('name');
    let nameBank = $(this).data('namebank');
    let nomorRekening = $(this).data('nomorrekening');
    $('#edit-modal').modal('show');
    $('.id').val(id);
    $('.name').val(name);
    $('.nameBank').val(nameBank);
    $('.nomorRekening').val(nomorRekening);
  })
});
