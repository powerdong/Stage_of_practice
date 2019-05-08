(function () {
    console.log(province);
    console.log(city);
    console.log(allschool);

    var provinceNode = document.getElementById('province'),
        cityNode = document.getElementById('city'),
        scoolNode = document.getElementById('school');

    // 省份
    var proStr = '';
    for (var i = 0; i < province.length; i++) {
        proStr += '<option value = ' + province[i][0] + '>' + province[i][1] + '</option>';

    }
    provinceNode.innerHTML = proStr;

    // 城市
    var cityArr = city[provinceNode.value];
    var cityStr = '';
    for (var i = 0; i < cityArr.length; i++) {
        cityStr += '<option value = ' + cityArr[i][0] + '>' + cityArr[i][1] + '</option>';
    }
    cityStr += '<option value = "999">其他</option>';
    cityNode.innerHTML = cityStr;

    // 学校
    var schoolArr = allschool[cityNode.value];
    var schoolStr = '';
    for (var i = 0; i < schoolArr.length; i++) {
        schoolStr += '<option value = "">' + schoolArr[i][2] + '</option>';

    }
    schoolStr += '<option value = "999">其他</option>';
    scoolNode.innerHTML = schoolStr;


    provinceNode.onchange = function () {
        var cityArr = city[provinceNode.value];
        var cityStr = '';

        for (var i = 0; i < cityArr.length; i++) {
            cityStr += '<option value = ' + cityArr[i][0] + '>' + cityArr[i][1] + '</option>';
        }
        cityStr += '<option value = "999">其他</option>';

        cityNode.innerHTML = cityStr;
        var schoolArr = allschool[cityNode.value];

        var schoolStr = '';
        if (schoolArr) {
            for (var i = 0; i < schoolArr.length; i++) {
                schoolStr += '<option value = "">' + schoolArr[i][2] + '</option>';

            }
            schoolStr += '<option value = "999">其他</option>';
            scoolNode.innerHTML = schoolStr;
        }
    }

    cityNode.onchange = function () {
        var schoolArr = allschool[cityNode.value];
        var schoolStr = '';

        if (schoolArr) {
            for (var i = 0; i < schoolArr.length; i++) {
                schoolStr += '<option value = "">' + schoolArr[i][2] + '</option>';

            }
            schoolStr += '<option value = "999">其他</option>';
            scoolNode.innerHTML = schoolStr;
        } else {
            schoolStr += '<option value = "999">其他</option>';
            scoolNode.innerHTML = schoolStr;
        }

    }




})()