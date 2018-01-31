;(function(){

  var $main = $('#carousel')

  function setup() {
    $main.children().off('click')

    $main.children(':lt(2)').click(function(){
      // 最后一个移到最前面
      $main.children(':last').prependTo($main)
      setup()
    })

    $main.children(':eq(3),:eq(4)').click(function(){
      // 第一个移到最后面
      $main.children(':first').appendTo($main)
      setup()
    })
  }

  setup()

})();
