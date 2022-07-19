const url = 'http://localhost:8080/api/users/'


//  элементы документа, которые "нужны" для нажатия кнопок
let table = $('#tableFon')
let btnNewUser = $('#newUser')
let btnUserTable = $('#userTable')
let stringAllUsers = $('#allUsers')
let stringAddNewUser = $('#addNewUser')
let formForNewUser = $('#blockForNewUser')
stringAddNewUser.hide()
formForNewUser.hide()
let tableBody = $('#table tbody');
let btnAdmin = $('#btnAdmin')
let btnUser = $('#btnUser')
let navig = $('#navig')
let stringUserPanel = $('#userPanel')
let stringAdminPanel = $('#adminPanel')
let stringAboutUser = $('#aboutUser')
stringUserPanel.hide()
stringAboutUser.hide()
let tableForAdmin = $('#tableForAdmin')
let tableFonForAdmin = $('#tableFonForAdmin')
tableForAdmin.hide()
tableFonForAdmin.hide()
let tableForAdminBody = $('#tableForAdmin tbody');


// действия для нажатия кнопки админа
$(btnAdmin).click(function () {
    table.show()
    btnUserTable.addClass('active')
    btnNewUser.removeClass('active')
    stringAddNewUser.hide()
    stringAllUsers.show()
    formForNewUser.hide()
    btnUser.removeClass('active')
    btnAdmin.addClass('active')
    navig.show()
    stringAdminPanel.show()
    stringUserPanel.hide()
    stringAboutUser.hide()
    tableFonForAdmin.hide()
    tableForAdmin.hide()


})

// действия для нажатия кнопки юзера для админа
$(btnUser).click(function () {
    table.hide()
    btnUserTable.removeClass('active')
    btnNewUser.removeClass('active')
    stringAddNewUser.hide()
    stringAllUsers.hide()
    formForNewUser.hide()
    btnUser.addClass('active')
    btnAdmin.removeClass('active')
    navig.hide()
    stringAdminPanel.hide()
    stringUserPanel.show()
    stringAboutUser.show()
    tableFonForAdmin.show()
    tableForAdmin.show()
})

// таблица для отображения информации о пользователе админе
let getPrincipal = fetch('http://localhost:8080/api/admin/user').then(
    res => {
        res.json().then(
            user => {
                let temp = '';
                console.log(user.name)
                temp += '<tr class="table-borderless">'
                temp += '<td>' + user.id + '</td>'
                temp += '<td>' + user.username + '</td>'
                temp += '<td>' + user.password + '</td>'
                temp += '<td>' + user.age + '</td>'
                temp += '<td>' + user.rolesString + '</td>'
                temp += '</tr>'
                tableForAdminBody.append(temp)
            })

    }
)

// действия для кнопки создания юзера
$(btnNewUser).click(function () {
    table.hide()
    btnNewUser.addClass('active')
    btnUserTable.removeClass('active')
    stringAllUsers.hide()
    stringAddNewUser.show()
    formForNewUser.show()


//создание нового юзера
        $('#btnCreate').click(async (e) => {
            let addUserForm = $('#formForNewUser')
            let username = addUserForm.find('#usernameForAdd').val().trim();
            let password = addUserForm.find('#passwordForAdd').val().trim();
            let age = addUserForm.find('#ageForAdd').val().trim();
            let roles = []
        let editRolesList = [];
            for (let i = 0; i < $('#select').val().length; i++) {
                if ($('#select').val()[i] === '1') {
                    editRolesList[i] = {id: 1, name: 'USER'};
                } else {
                    editRolesList[i] = {id: 2, name: 'ADMIN'};
                }

            }
            roles = editRolesList

        let user = {
            username: username,
            password: password,
            age: age,
            roles: roles
        }
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => location.reload())
            .then(table.show())


    })

})

// действия для кнопки отображения всех юзеров
$(btnUserTable).click(function () {
    table.show()
    btnUserTable.addClass('active')
    btnNewUser.removeClass('active')
    stringAddNewUser.hide()
    stringAllUsers.show()
    formForNewUser.hide()

})


// отображение таблицы с юзерами
tableBody.empty();
let findAllUsers = fetch(url).then(
    res => {
        res.json().then(
            data => {
                if (data.length > 0) {
                    let temp = '';
                    data.forEach((user) => {
                        temp += '<tr class="table-borderless">'
                        temp += '<td>' + user.id + '</td>'
                        temp += '<td>' + user.username + '</td>'
                        temp += '<td>' + user.password + '</td>'
                        temp += '<td>' + user.age + '</td>'
                        temp += '<td>' + user.rolesString + '</td>'
                        temp += `<td th:width="20">
                                <button type="button" size="10"  id ="btnEdit" data-action="edit" class="btnEdit btn btn-info"
                                data-toggle="modalEdit"  data-modal ="modalEdit" data-target="#modalEdit">Edit</button>
                            </td>`
                        temp += `<td th:width="20">
                                <button type="button" size="10" id ="btnDelete"  data-action="delete" class="btnDelete btn btn-danger"
                                data-toggle="modal" data-target="#someDefaultModal">Delete</button>
                            </td>`
                    })
                    tableBody.append(temp)
                }
            }
        )
    }
)


// шаблон для модальных окон
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}


// данные которые нужны для модального окна для удаления
let modalDelete = $('.modal-fade2');
const formModalDelete = document.getElementById('modalDeleteForm')
const idForDelete = document.getElementById('userIdForDelete')
const usernameForDelete = document.getElementById('usernameForDelete')
const passwordForDelete = document.getElementById('passwordForDelete')
const ageForDelete = document.getElementById('ageForDelete')

// функция нажатия на кнопку удаления
on(document, 'click', '.btnDelete', e => {
    const fila1 = e.target.parentNode.parentNode
    idForDelete.value = fila1.children[0].innerHTML
    usernameForDelete.value = fila1.children[1].innerHTML
    passwordForDelete.value = fila1.children[2].innerHTML
    ageForDelete.value = fila1.children[3].innerHTML
    modalDelete.addClass('is-show')

    $('.close').click(function () {
        modalDelete.removeClass('is-show')
    })

    $('.btn-secondary').click(function () {
        modalDelete.removeClass('is-show')
    })
})

// запрос на удаление пользователя
formModalDelete.addEventListener('submit', async (e) => {
    e.preventDefault()
    await fetch(url + idForDelete.value, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => location.reload())


    modalDelete.removeClass('is-show')
})


// данные нужные для модального окна для редактирования
let modal = $('.modal-fade');
const formModalEdit = document.getElementById('modalEditForm')
const id = document.getElementById('userId')
const username = document.getElementById('username')
const password = document.getElementById('password')
const age = document.getElementById('age')
let roles = $('#rolesForEdit').val()

let editRolesList = [];


// функция нажатия на кнопку редактирования
on(document, 'click', '.btnEdit', e => {
    const fila = e.target.parentNode.parentNode
    id.value = fila.children[0].innerHTML
    username.value = fila.children[1].innerHTML
    password.value = fila.children[2].innerHTML
    age.value = fila.children[3].innerHTML

    modal.addClass('is-show')

    $('.close').click(function () {
        modal.removeClass('is-show')
    })

    $('.btn-secondary').click(function () {
        modal.removeClass('is-show')
    })
})

// запрос на редактирование пользователя
formModalEdit.addEventListener('submit', async (e) => {
    e.preventDefault()
    let editRolesList = [];
    for (let i = 0; i < $('#rolesForEdit').val().length; i++) {
        if ($('#rolesForEdit').val()[i] === '1') {
            editRolesList[i] = {id: 1, name: 'USER'};
        } else {
            editRolesList[i] = {id: 2, name: 'ADMIN'};
        }

    }
    roles = editRolesList

    await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id.value,
            username: username.value,
            password: password.value,
            age: age.value,
            roles: roles
        })
    })
     .then(response => location.reload())

    modal.removeClass('is-show')
})

