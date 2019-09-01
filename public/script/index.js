var i=0;
$(".mob").mouseenter(function(){
  $(this).attr("class","absolute");
});

$(".lll").click(function(){
  if(i%2==0)
  {
      $(this).attr("src","img/heart.svg");
  }
  else {
      $(this).attr("src","img/5.svg");
  }
  
  i++;
});
// $(".askForm").mouseenter(function(){
//   $(this).animate({
//     boxShadow: '10px 10px 15px grey'
//   });
// });
//
// $(".askForm").mouseleave(function(){
//   $(this).animate({
//     boxShadow: '4px 4px 15px grey'
//   });
// });

function changeStyleForquestion(){
  document.getElementById("ShoutOut").className='far fa-question-circle';
}