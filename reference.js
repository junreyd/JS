<script>
    // ...
    $.ajax(... async: false ...); // Hey browser! first complete this request, 
                                  // then go for other codes

    $.ajax(...); // Executed after the completion of the previous async:false request.
</script>

           
           https://jsfiddle.net/Ltg254ep/
