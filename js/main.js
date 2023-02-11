$('.btn').on('click', function () {
    var $this = $(this);
    $this.button('loading');
    setTimeout(function () {
        const urlArray = [
            'https://www.youtube.com/watch?v=UIp6_0kct_U',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        ]
        $this.button('reset');
        var randomNum = Math.floor(Math.random() * urlArray.length);
        document.write("<h2>Thank You!</h2>");
        window.location.href = urlArray[randomNum];
    }, 1000);
});

setTimeout(function () {
    const urlArray = [
        'https://www.youtube.com/watch?v=UIp6_0kct_U',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    ]

    var randomNumber = Math.floor(Math.random() * urlArray.length);
    document.write("<h2>Thank You!</h2>");
    window.location.href = urlArray[randomNumber];
}, 5000);