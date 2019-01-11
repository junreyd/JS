
$(function () {

});



function start_load() {
    $('#LIST_ITMEMBERS').empty();

    $('#loader_show_hide').show();

    $('#reward_name').val('');
    $('#reward_indication').empty();
    $('#required_points').val('');
    $('#inputFile').val('');


    $('#cancel_modal').on('click', function (e) {
        $('.ui.modal').modal('hide');
    });



    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getbytitle('Rewards_List')/items",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose",
            "content-type": "application/json;odata=verbose"
        },
        success: function (data) {
            $('#LIST_REWARDS').empty();
            $('#loader_show_hide').hide();
            rewards_list_result = data.d.results;


            $.each(rewards_list_result, function (key, value) {
                // for (let item of rewards_list_result) {

                // console.log(item.ID + " :-------> " + item.Reward_Name);
                // console.log(item.ID);
                // rewards_list_result.sort((a, b) => parseFloat(a.rewards_list_result) - parseFloat(b.rewards_list_result));

                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getbytitle('Rewards_List')/items('" + value.ID + "')/AttachmentFiles",
                    method: "GET",
                    headers: {
                        "Accept": "application/json; odata=verbose",
                        "content-type": "application/json;odata=verbose"
                    },
                    success: function (data) {
                        url_for_image = data.d.results;

                        // console.log(url_for_image[0].ServerRelativeUrl);
                        // console.log(item.ID + " :-------> " + item.Reward_Name);
                        console.log(value.ID);


                        if (url_for_image.length > 0) {

                            $('#LIST_REWARDS').append(`
                        <div class="item">

                        <img class = "ui avatar tiny circular image"
                        src = "${_spPageContextInfo.webAbsoluteUrl}${url_for_image[0].ServerRelativeUrl}"
                        style = "margin: 15px; width: 111px;">
                        <div class="content">
                        <div class="ui center aligned fluid basic segment" style = "margin-top: 25px; margin-left: 10px;">
                        <div class="header">${value.Reward_Indication}</div>
                        <br>
                        <a href='#' onClick='grab_reward(${value.ID})'>${value.Reward_Name}</a>
                        <br>
                        <br>
                        <div>${value.Required_Points} Points to get award</div>
                        </div>
                        </div>
                        <div class="ui bars dropdown" style="float: right; margin-top: 10px;"><i class="ellipsis horizontal icon"></i>
                        <div class="menu">
                        <div class="item" onClick='Delete_Reward(${value.ID})' data-value="remove">Remove</div>
                        <div class="item" onclick="update_reward(${value.ID});" data-value="edit">Edit</div>
                        </div>
                        </div>
                        </div>
                        `)
                        } else {

                            $('#LIST_REWARDS').append(`
                        <div class="item">

                        <img class = "ui avatar tiny circular image"
                        src = "https://intranet.houseofit.com.au/SiteAssets/Image/defaultphoto_2x.png"
                        style = "margin: 15px; width: 111px;" >
                        <div class="content">
                        <div class="ui center aligned fluid basic segment" style = "margin-top: 25px; margin-left: 10px;">
                        <div class="header">${value.Reward_Indication}</div>
                        <br>
                        <div>${value.Reward_Name}</div>
                        <br>
                        <div>${value.Required_Points} Points to get award</div>
                        </div>
                        </div>
                        <div class="ui bars dropdown" style="float: right; margin-top: 10px;"><i class="ellipsis horizontal icon"></i>
                        <div class="menu">
                        <div class="item" onClick='Delete_Reward(${value.ID})' data-value="remove">Remove</div>
                        <div class="item" onclick="update_reward(${value.ID});" data-value="edit">Edit</div>
                        </div>
                        </div>
                        </div>
                        `)
                        }
                        $('#loader_show_hide').hide();
                        if (targetUser === "junreyd") {

                            $('.five.column.table tfoot tr').show();
                            $('.ui.bars.dropdown').show();

                        } else {

                            $('.five.column.table tfoot tr').hide();
                            $('.ui.bars.dropdown').hide();
                        }

                        $('.ui.bars.dropdown')
                            .dropdown({
                                action: 'hide'
                            });
                    },
                    error: function (error) {
                        alert(JSON.stringify(error));
                    }
                });
            }); //foreach
            // } //for
        },
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });



    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/it/_api/Web/Lists/getbytitle('IT Members')/items?$filter=Status eq 'Active'",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function (data) {

            itmembers_list_result = data.d.results;

            for (var i = 0; i < itmembers_list_result.length; i++) {

                if (itmembers_list_result[i].Points) {

                    $('#LIST_ITMEMBERS').append(`

                    <div class="card" onClick='show_IT_Employee(${itmembers_list_result[i].Id})'>
                  
                    <div class="content">
                    <div class="header">${itmembers_list_result[i].Title}</div>
                    <div class="meta">
                    <a>${itmembers_list_result[i].Employee_Type}</a>
                    </div>
                        <div class="description" style="font-size: 19px;">
                            ${itmembers_list_result[i].Points} Points
                        </div>
                    </div>
                    </div>
                    `)
                } else {
                    $('#LIST_ITMEMBERS').append(`

                    <div class="card" onClick='show_IT_Employee(${itmembers_list_result[i].Id})'>
                  
                    <div class="content">
                    <div class="header">${itmembers_list_result[i].Title}</div>
                    <div class="meta">
                    <a>${itmembers_list_result[i].Employee_Type}</a>
                    </div>
                        <div class="description" style="font-size: 19px;">
                            0 Point
                        </div>
                    </div>
                    </div>
                    `)
                }
            }

            if (targetUser != "junreyd") {
                $('.card').removeAttr('onClick');
            }

        },
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });



}





function show_IT_Employee(id) {

    $('#points_dropdown').dropdown();

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/it/_api/Web/Lists/getbytitle('IT Members')/GetItemByID(" + id + ")",
        method: "GET",

        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose"
        },

        success: function (data) {
            var dataPoint = 0;

            if (data.d.Points == null || data.d.Points == "") {
                dataPoint = '0';
            } else {
                dataPoint = data.d.Points;
            }

            $('.addpoints').modal('show');

            $('#id_add_points').val(data.d.ID);
            $('#fullname').val(data.d.Title);
            $('#employee_type').val(data.d.Employee_Type);
            $('#points_dropdown').dropdown("set selected", dataPoint);

        },

        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
}





function btnAddPoints() {


    // $('#loader_show_hide').show();
    var id = $('#id_add_points').val();
    var points = $('#points_add').val();


    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/it/_api/Web/Lists/getbytitle('IT Members')/items('" + id + "')",
        method: "POST", //Specifies the operation to create the list item  
        data: JSON.stringify({
            '__metadata': {
                'type': 'SP.Data.IT_x0020_MembersListItem'
            },
            'Points': points
        }),
        headers: {
            "accept": "application/json;odata=verbose", //It defines the Data format   
            "content-type": "application/json;odata=verbose", //It defines the content type as JSON  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(), //It gets the digest value   
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
        },
        success: function (data) {
            start_load();
            $('.addpoints').modal('hide');
            console.log("Completed add points");

        },
        error: function (error) {
            console.log(JSON.stringify(error));

        }

    });
}





function grab_reward(id) {
    $('#loader_show_hide').show();
    $('#grab_reward').empty();
    $('.take_reward').modal('show');

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getbytitle('Rewards_List')/GetItemByID('" + id + "')",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose",
            "content-type": "application/json;odata=verbose"
        },
        success: function (datas) {

            $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getbytitle('Rewards_List')/items('" + id + "')/AttachmentFiles",
                method: "GET",
                headers: {
                    "Accept": "application/json; odata=verbose"
                },
                success: function (data) {
                    url_for_image = data.d.results;
                    $('#loader_show_hide').hide();
                    $('#grab_reward').append(
                        `<div class="card">
                                           <div class="content">
                                           <img class="right floated mini ui image" style="width: 100%" src="${_spPageContextInfo.webAbsoluteUrl}${url_for_image[0].ServerRelativeUrl}">
                                           <div class="header">
                                            ${datas.d.Reward_Name}
                                           </div>
                                           <div class="meta">
                                           ${datas.d.Required_Points} Points minimum redemption.
                                           </div>
                                           <div class="description">
                                           Please make sure you have ...
                                           </div>
                                           </div>
                                           <div class="extra content">
                                           <div class="ui two buttons">
                                           <div class="ui basic green button">Redeem</div>
                                           <div class="ui basic red button">Later</div>
                                           </div>
                                           </div>
                                           </div>`);
                },
                error: function (error) {
                    alert(JSON.stringify(error));
                }
            });
        },
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });
}







ExecuteOrDelayUntilScriptLoaded(init, 'sp.js');
var currentUser;




function init() {

    this.clientContext = new SP.ClientContext.get_current();
    this.oWeb = clientContext.get_web();
    currentUser = this.oWeb.get_currentUser();
    this.clientContext.load(currentUser);
    this.clientContext.executeQueryAsync(Function.createDelegate(this, this.onLoad));

}




var targetUser;




function onLoad() {
    var account = currentUser.get_loginName();
    targetUser_temp = account.substring(account.indexOf("|") + 10);
    targetUser = targetUser_temp;
    SP.SOD.executeOrDelayUntilScriptLoaded(start_load, 'SP.UserProfiles.js');
}



// function getUserProperties() {

//     if (targetUser == "junreyd") {

//         $('#check_user').unbind('click');
//         console.log("disabled");
//     } else {
//         console.log("else");
//     }
// }




function addreward() {
    $('#add_reward_indication').dropdown();
    $('.addreward').modal('show');
}





function addreward_cancel() {
    $('.addreward').modal('hide');
}


function editreward_cancel() {
    $('.editreward').modal('hide');
}





function update_reward(id) {



    $('#inputFile_edit').val('');

    $('#reward_indication_edit').dropdown();


    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Rewards_List')/GetItemByID(" + id + ")",
        method: "GET",

        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose"
        },

        success: function (data) {

            $('#uuid').val(data.d.ID);
            $('#reward_name_edit').val(data.d.Reward_Name);
            $("#reward_indication_edit").dropdown("set selected", data.d.Reward_Indication);
            $('#required_points_edit').val(data.d.Required_Points);

            getAttachment_to_delete(data.d.AttachmentFiles.__deferred.uri, data.d.ID);
        },

        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
}






function btnUpdate() {

    $('#LIST_REWARDS').empty();

    var reward_name = $('#reward_name_edit').val();
    var reward_indication = $('#reward_indication_TOedit').val();
    var required_points = $('#required_points_edit').val();

    var data = {
        '__metadata': {
            'type': 'SP.Data.Rewards_x005f_ListListItem'
        },
        'Reward_Name': reward_name,
        'Reward_Indication': reward_indication,
        'Required_Points': required_points
    };

    editreward_submit_validation(data);
}





function editreward_submit_validation(data) {

    var dataID = $('#uuid').val();
    var dataAttachmentFile = $('#inputFile_edit');

    // document.getElementById('attach_id_delete') != null ||
    // if (document.getElementById('reward_name_edit') === null || document.getElementById('reward_indication_TOedit') === null document.getElementById('reward_name_edit') === null) {
    $.ajax({
        url: `${_spPageContextInfo.webAbsoluteUrl}/_api/Web/Lists/getbytitle('Rewards_List')/items(${dataID})`,
        method: "POST",
        data: JSON.stringify(data),
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
        },

        success: function (data) {


            start_load();
            $('.editreward').modal('hide');

            // IF USER UPDATE THE ATTACHMENT FILE

            var fileCount = dataAttachmentFile[0].files.length;
            var fileArray = [];

            for (var i = 0; i < fileCount; i++) {
                fileArray.push(dataAttachmentFile[0].files[i]);

                if (fileCount - 1 === i) {
                    update_attachment(fileArray, fileCount);
                    console.log("there was a file");

                } else {
                    console.log("no file");

                }
            }

            // IF USER UPDATE THE ATTACHMENT FILE




        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });

    // } else {
    //     console.log("No.");
    //     $('#rewardImage_validation_update').show();
    // }
}




function update_attachment(fileArray, fileCount) {

    // oLoader = SP.UI.ModalDialog.showWaitScreenWithNoClose("Working on it", "Updating SharePoint IssueReport Report...");
    var UId = $('#uuid').val();

    var FilesCount = 0;
    var deferred = $.Deferred();
    var uploadStatus = "";
    var file = fileArray[0];
    var getFile = getFileBuffer(file);


    getFile.done(function (buffer, status, xhr) {


        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/GetByTitle('Rewards_List')/items(" + UId + ")/AttachmentFiles/add(FileName='" + file.name + "')",
            type: "POST",
            processData: false,
            contentType: "application/json;odata=verbose",
            data: buffer,
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {

                $('#LIST_REWARDS').empty();

                FilesCount++;
                uploadStatus = FilesCount;
                fileArray.shift();

                if (fileArray.length > 0) {
                    update_attachment(fileArray, fileArray.length);
                } else {
                    console.log("I am else in attachment file upload.");

                    start_load();
                    $('.editreward').modal('hide');

                }
            },

            error: function (err) {
                console.log(JSON.stringify(err));
            }

        });



        deferred.resolve(uploadStatus);


    });

    getFile.fail(function (err) {
        deferred.reject(err);
    });

    return deferred.promise();

}





function getAttachment_to_delete(AttachmentURL, AttachmentID) {



    var files = "";

    $.ajax({
        url: AttachmentURL,
        type: "GET",
        headers: {
            "ACCEPT": "application/json;odata=verbose"
        },

        success: function (data) {

            if (data.d.results.length > 0) {
                $.each(data.d.results, function (i, item) {
                    var title = item.FileName;
                    files += "<p><a href='#' onClick='DeleteItemAttachment(this)' data-id='" + AttachmentID + "' data-title='" + title + "' class='remove' style='color: red;'> x  </a><a href='https://intranet.houseofit.com.au/" + item.ServerRelativeUrl + "'>" + item.FileName + "</a><br><img style='max-width: 250px;' src='https://intranet.houseofit.com.au/" + item.ServerRelativeUrl + "'></p>"

                    $('#attach_id_delete').html(files);

                });
                $('#inputFile_edit').hide();
                $('.editreward').modal('show');
                console.log("have an image");

            } else {
                $('#inputFile_edit').show();

                console.log("no image");
            }

        },
        error: function () {
            alert("Error getting the Marketplace Items");
        }
    });
}




function DeleteItemAttachment(item) {

    // $('#loader_show_hide').show();

    $('#inputFile_edit').val('');

    $(item).parent().remove();
    var Dfd = $.Deferred();
    var temp_item_id = $(item).attr('data-id')
    var temp_file_title = $(item).attr('data-title')
    var Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Rewards_List')/GetItemById(" + temp_item_id + ")/AttachmentFiles/getByFileName('" + temp_file_title + "')";

    $.ajax({
        url: Url,
        type: 'DELETE',
        contentType: 'application/json;odata=verbose',
        headers: {
            'X-RequestDigest': $('#__REQUESTDIGEST').val(),
            'X-HTTP-Method': 'DELETE',
            'Accept': 'application/json;odata=verbose'
        },
        success: function (data) {

            // $('#loader_show_hide').hide();

            Dfd.resolve(data);
            $('#inputFile_edit').show();
        },
        error: function (error) {
            Dfd.reject(JSON.stringify(error));
        }
    });
    return Dfd.promise();
}






function Delete_Reward(id) {
    console.log(id);

    // $('#LIST_REWARDS').empty();
    // $('#LIST_ITMEMBERS').empty();

    $('#loader_show_hide').show();

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Rewards_List')/items(" + id + ")",
        method: "POST",
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        },
        success: function (data) {
            start_load();
        },
        error: function (error) {
            console.log(JSON.stringify(error));

        }

    });
}







function addreward_submit() {


    $('#LIST_REWARDS').empty();
    $('.addreward').modal('hide');
    $('#loader_show_hide').show();


    var reward_name = $('#reward_name').val();
    var reward_indication = $('#reward_indication').val();
    var required_points = $('#required_points').val();

    var data = {
        '__metadata': {
            'type': 'SP.Data.Rewards_x005f_ListListItem'
        },
        'Reward_Name': reward_name,
        'Reward_Indication': reward_indication,
        'Required_Points': required_points
    };

    if (document.getElementById("inputFile").files.length === 0) {
        $('#rewardImage_validation').show();


    } else {

        addreward_submit_validation(data).then(function (data) {

            var itemId = data.d.ID;
            var fileInput = $('#inputFile');
            var fileCount = fileInput[0].files.length;
            var fileArray = [];
            for (var i = 0; i < fileCount; i++) {
                fileArray.push(fileInput[0].files[i]);
            }
            upload_file(itemId, fileArray, fileCount);

        });
    }
}






function addreward_submit_validation(data) {

    return $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getbytitle('Rewards_List')/items",
        method: "POST",
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        data: JSON.stringify(data),
        success: function (data) {
            console.log("Item created successfully", "success");


        },
        error: function (error) {
            console.log(JSON.stringify(error));

        }

    });
}



function getFileBuffer(file) {
    var deferred = $.Deferred();
    var reader = new FileReader();
    reader.onload = function (e) {
        deferred.resolve(e.target.result);
    }
    reader.onerror = function (e) {
        deferred.reject(e.target.error);
    }
    reader.readAsArrayBuffer(file);
    return deferred.promise();
}





function upload_file(itemId, fileArray, fileCount) {


    var FilesCount = 0;
    var deferred = $.Deferred();
    var uploadStatus = "";
    var file = fileArray[0];
    var getFile = getFileBuffer(file);

    getFile.done(function (buffer, status, xhr) {
        var bytes = new Uint8Array(buffer);
        var content = new SP.Base64EncodedByteArray();
        var queryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/GetByTitle('Rewards_List')/items(" + itemId + ")/AttachmentFiles/add(FileName='" + file.name + "')";
        var uploadCount = 0;
        $.ajax({
            url: queryUrl,
            type: "POST",
            processData: false,
            contentType: "application/json;odata=verbose",
            data: buffer,
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {


                FilesCount++;
                uploadStatus = FilesCount;
                fileArray.shift();
                if (fileArray.length > 0) {
                    upload_file(itemId, fileArray, fileArray.length);


                    // console.log("in if submit");


                } else {
                    console.log("Successfully Sumbitted");
                    // window.location.assign('https://intranet.houseofit.com.au/SitePages/Reward%20System.aspx');


                    start_load();
                }
            },




            error: function (err) {
                alert("Some of your files failed to save, please try again.");
                window.location.assign('https://intranet.houseofit.com.au/SitePages/Reward%20System.aspx');
            }
        });
        deferred.resolve(uploadStatus);

    });
    getFile.fail(function (err) {
        deferred.reject(err);
    });
    return deferred.promise();
}

// $(document).ready(function () {
//     $("#inputFile_edit").change(function () {
//         console.log(document.getElementById("inputFile_edit").files[0].name);

//     })
// })
