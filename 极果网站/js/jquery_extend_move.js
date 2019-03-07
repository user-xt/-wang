$.fn.extend({
    scrollpicture: function(option) {
        //抛出异常
        if (!option.parent || !option.list) { throw "parent or list is undefined"; }
        //默认
        var defaultOption = {
                "time": 1000,
                "num": 4,
                "left": "#left",
                "right": "#right"
            }
            //用户自定义覆盖
        $.extend(true, defaultOption, option);
        // console.log(defaultOption);


        var $width = $(defaultOption.list).innerWidth();
        //console.log($width);
        $(defaultOption.right).on("click", function() {
            $(defaultOption.parent).animate({ "marginLeft": (-$width - 40) * defaultOption.num }, defaultOption.time, function() {
                $(defaultOption.list).slice(0, defaultOption.num).appendTo($(defaultOption.parent));
                $(defaultOption.parent).css("marginLeft", "0");
            });

        });
        var isanimatend = true;
        $(defaultOption.left).on("click", function() {

            //解决点击过快的bug
            if (isanimatend) {
                isanimatend = false;
                $(defaultOption.parent).css("marginLeft", (-$width - 40) * defaultOption.num);
                $(defaultOption.list).slice(-defaultOption.num).prependTo($(defaultOption.parent));
                $(defaultOption.parent).animate({ "marginLeft": "0px" }, defaultOption.time, function() {
                    isanimatend = true;
                });
            }

        })

        // 计时器
        function run() {
            $(defaultOption.parent).animate({ "marginLeft": (-$width - 40) * defaultOption.num }, defaultOption.time, function() {
                $(defaultOption.list).slice(0, defaultOption.num).appendTo($(defaultOption.parent));
                $(defaultOption.parent).css("marginLeft", "0");
            });
        }
        var runshow;

        function times() {
            runshow = setInterval(function() {
                run();
            }, 1500)
        }
        times()

        // 移出事件
        $(defaultOption.right).on("mouseenter", function() {
            clearInterval(runshow);
        })
        $(defaultOption.right).on("mouseleave", function() {
            times();
        })

        $(defaultOption.left).on("mouseenter", function() {
            clearInterval(runshow);
        })
        $(defaultOption.left).on("mouseleave", function() {
            times();
        })
        $(defaultOption.parent).on("mouseenter", function() {
            clearInterval(runshow);
        })
        $(defaultOption.parent).on("mouseleave", function() {
            times();
        })




    }
})