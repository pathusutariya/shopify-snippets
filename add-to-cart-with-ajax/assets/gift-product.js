$("#free_gift_product_form").off().submit(function(e){
    e.preventDefault();
    var gift_product_id = $(this).find('input[name="id"]').val();
    addCartFreeGift('id='+gift_product_id+'&quantity=1');
});
function addCartFreeGift(data){
    var params = {
        type: 'POST',
        url: '/cart/add.js',
        data: 'data',
        dataType: 'json',
        success: function (cart) {
            var cart_count = $('#CartCount').text();
            cart_count = parseInt(cart_count);
            $('#CartCount').text(cart_count+1)
            if ($("#free_gift_product_form").length > 0) {
                $("#free_gift_product_form").find(".addToCart-btn").attr('disabled', 'disabled');
            }
            location.reload();
        },
        error: function (XMLHttpRequest, textStatus) {
        }
    };
    console.log(params);
    jQuery.ajax(params);
}