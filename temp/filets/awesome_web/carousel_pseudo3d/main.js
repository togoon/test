;(function(){

  var $main = $('#carousel')

  function setup() {
    $main.children().off('click')

    $main.children(':lt(2)').click(function(){
      $main.children(':last').prependTo($main)
      setup()
    })

    $main.children(':eq(3),:eq(4)').click(function(){
      $main.children(':first').appendTo($main)
      setup()
    })
  }

  setup()

})();
