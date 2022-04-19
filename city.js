
function getAllCity() {
    $.ajax({
        url: `http://localhost:8080/cities`,
        type: 'GET',
        success: function (cities) {
            let content = '';
            for (let i = 0; i < cities.length; i++) {
                content += `<tr>
        <td>${i + 1}</td>
        <td><a href="/final_examp_module4/cityDetail.html?id=${cities[i].id}">${cities[i].nameCity}</a></td>
        <td>${cities[i].country.nameCountry}</td>
        <td><button class="btn btn-primary"><i class="fa fa-edit" data-target="#create-city" data-toggle="modal"
                                        type="button" onclick="showEditCity(${cities[i].id})"></i></button></td>
        <td><button class="btn btn-danger"  data-target="#delete-city" data-toggle="modal"
                                        type="button" onclick="showDeleteCity(${cities[i].id})"><i class="fa fa-trash"></i></button></td>
    </tr>`
            }
            $('#city-list-content').html(content);
        }
    })
}

function showCreateCity() {
    let title = "Thêm Thông Tin Thành Phố";
    let footer = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                  <button class="btn btn-primary" onclick=" createNewCity()" type="button" data-dismiss="modal">Tạo mới</button>`
    $(`#create-city-footer`).html(footer);
    $(`#create-city-title`).html(title);
    $(`#nameCity`).val(null);
    $(`#area`).val(null);
    $(`#population`).val(null);
    $('#gdp').html(null);
    $('#description').html(null);
    drawCountry();
}

function createNewCity() {
    let nameCity = $('#nameCity').val();
    let country = $('#nameCountry').val();
    let area = $('#area').val();
    let population = $('#population').val();
    let gdp = $('#gdp').val();
    let description = $('#description').val();
    let city = {
        nameCity: nameCity,
        country: {
            id : country
        },
        area: area,
        population: population,
        gdp: gdp,
        description: description
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/cities',
        data: JSON.stringify(city),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function () {
            getAllCity();
            showSuccessMessage('Tạo thành công!');
        },
        error: function () {
            showErrorMessage('Tạo lỗi!');
        }
    })
}

function deleteCity(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/cities/${id}`,
        success: function () {
            getAllCity();
            showSuccessMessage('Xóa thành công!');
            // $('#delete-product').hide();
        },
        error: function () {
            showErrorMessage('Xóa lỗi');
        }
    })
}

function showDeleteCity(id) {
    let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-danger" onclick="deleteCity(${id})" type="button">Xóa</button>`;
    $('#footer-delete').html(content);
}

function showEditCity(id) {
    let title = 'Chỉnh sửa thông thành phố';
    let footer = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-primary" onclick="editCity(${id})" type="button">Cập nhật</button>`;
    $('#create-city-title').html(title);
    $('#create-city-footer').html(footer);
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/cities/${id}`,
        success: function (city) {
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/countries',
                success: function (countries) {
                    countries = countries.content;
                    let content = "";
                    for (let i = 0; i < countries.length; i++) {
                        if (countries[i].id === city.country.id) {
                            content += `<option value="${countries[i].id}" selected>${countries[i].nameCountry}</option>`
                        }else {
                            content += `<option value="${countries[i].id}">${countries[i].nameCountry}</option>`
                        }
                    }
                    $('#nameCountry').html(content);
                }
            });
            $('#nameCity').val(city.nameCity);
            $('#area').val(city.area);
            $('#population').val(city.population);
            $('#gdp').val(city.gdp);
            $('#description').val(city.description);
        }
    })
}

function editCity(id) {
    let nameCity = $('#nameCity').val();
    let country = $('#nameCountry').val();
    let area = $('#area').val();
    let population = $('#population').val();
    let gdp = $('#gdp').val();
    let description = $('#description').val();
    let city = {
        nameCity: nameCity,
        country: {
            id: country
        },
        area: area,
        population: population,
        gdp: gdp,
        description: description
    }
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/cities/${id}`,
        data: JSON.stringify(city),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function () {
            getAllCity();
            showSuccessMessage('Sửa thành công!');
        },
        error: function () {
            showErrorMessage('Sửa lỗi!');
        }
    })
}

$(document).ready(function () {
    getAllCity();
})

function drawCountry(){
    $.ajax({
        type : "GET",
        url : 'http://localhost:8080/countries',
        success: function (countries){
            let content = `<option>Chọn Thể Loại</option>`
            for (let country of countries){
                content += `<option value="${country.id}">${country.nameCountry}</option>`
            }

            $(`#nameCountry`).html(content);

        }
    })
}

function getAllCityDetail() {
    let id = new URL(location.href).searchParams.get("id");
    $.ajax({
        url: `http://localhost:8080/cities/${id}`,
        type: 'GET',
        success: function (cities) {
            let content = '';
                content += `<tr>
        <td>1</td>
        <td>${cities.nameCity}</td>
        <td>${cities.country.nameCountry}</td>
        <td>${cities.area}</td>
        <td>${cities.population}</td>
        <td>${cities.gdp}</td>
        <td>${cities.description}</td>
      
    </tr>`
            $('#cityDetail-list-content').html(content);
        }
    })
}
getAllCityDetail();

