(function(){
  //if ('WeixinJSBridge' in window) WeixinApi.ready(init)
  //else init()
  init()

  function init() {
    var shareUrl = 'http://fritx.github.io/voice'
    var shareDesc = '将文字以语音的形式派发给朋友'
    var shareTitle = '语音派发'

    var wxData = {
      //appId: '',
      img: 'http://fritx.github.io/voice/logo.jpg',
      link: function(){
        return shareUrl
      },
      desc: function(){
        return shareDesc
      },
      title: function(){
        return shareTitle
      }
    }
    var wxCallback = function(res){
      alert(JSON.stringify(res))
    }
    wechat('friend', wxData, wxCallback)
    wechat('timeline', wxData, wxCallback)

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
        if (!text.trim()) {
          shareUrl = 'http://fritx.github.io/voice'
          shareDesc = '将文字以语音的形式派发给朋友'
          shareTitle = '语音派发'
          return
        }
        var url = [
          'http://voice.coding.io/?t=', text
        ].join('')

        $link.text(url)
        shareUrl = url
        shareDesc = '点击进入播放'
        shareTitle = '派发了一段语音'

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