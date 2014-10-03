(function(){
  //if ('WeixinJSBridge' in window) WeixinApi.ready(init)
  //else init()
  init()

  function init() {
    var wxData = {
      //appId: '',
      imgUrl: 'http://fritx.github.io/voice/logo.jpg',
      link: 'http://fritx.github.io/voice',
      desc: '点击进入播放',
      title: '派发了一段语音'
    }
    wechat('friend', wxData)
    wechat('timeline', wxData)

    $(function(){
      var $form = $('#form-voice')
      var $text = $('#input-text')
      var $link = $('#output-link')
      var $audioBox = $('#audio-box')

      $text.val(fetch())

      $form.on('submit', function(e){
        e.preventDefault()
        $link.empty()
        $audioBox.empty().removeClass('ready')

        var text = $text.val()
        var url = [
          'http://voice.coding.io/?t=', text
        ].join('')

        $link.text(url)
        wxData.link = url

        var $audio = $('<audio controls autoplay>')
          .attr('type', 'audio/mpeg')
          .on('canplay', function(){
            $audioBox.addClass('ready')
          })
          .attr('src', url)
          .appendTo($audioBox)
      })

      $('body').addClass('ready')

      if ('localStorage' in window) {
        setInterval(function(){
          save($text.val())
        }, 2000)
      }
    })
  }

  function save(text){
    localStorage.setItem('text', text)
  }
  function fetch(){
    return localStorage.getItem('text')
  }
})()