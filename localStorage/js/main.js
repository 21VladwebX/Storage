$(document).ready(function(){
  var tdList = $('body ul');
  var Mask = 'tdl_ ';// чтобыне было конфликтов при юзании иних фреймворков, и эти данные будут юзать только этот скрипт

  function showTasks(){
    var listen = localStorage.length;

    if(listen > 0){
      for(var i = 0; i < listen; i++){
        var key = localStorage.key(i);
        if(key.indexOf(Mask) == 0){ //  0 возвращает, если найденн соответствующий элемент
          $('<li> </li> ').addClass('newLi')
          .attr('data-itemid', key)
          .text(localStorage.getItem(key)).appendTo(tdList);
        }
      }
    }
  }


  showTasks();

  $('input').on('keydown',function(e){
    if(e.keyCode != 13)
      return ;
    var input = e.target.value;
    e.target.value = "";
    if(input.length > 0){

      var newId = 0;


      tdList.children().each(function(index, el){  // ищем новый id
        var jelId = $(el).attr('data-itemid').split(4);
        if(jelId > newId){
          newId = jelId;
        }
        newId++;
      });

      console.log(newId);
      localStorage.setItem(Mask + newId ,input);

      $('<li> </li> ').addClass('newLi')
      .attr('data-itemid', Mask + newId)
      .text(input).appendTo(tdList);
    };

  });

  $(document).on('click','.newLi',function(e){
    var jet = $(e.target);
    localStorage.removeItem(jet.attr('data-itemid'));
    jet.remove();
  });
})
