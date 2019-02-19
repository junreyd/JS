ExecuteOrDelayUntilScriptLoaded(init, 'sp.js');
var currentUser;
var targetUser;
var forqms;





function init() {

    this.clientContext = new SP.ClientContext.get_current();
    this.oWeb = clientContext.get_web();
    currentUser = this.oWeb.get_currentUser();
    this.clientContext.load(currentUser);
    this.clientContext.executeQueryAsync(Function.createDelegate(this, this.onLoad));

}





function onLoad() {

    var account = currentUser.get_loginName();
    targetUser_temp = account.substring(account.indexOf("|") + 10);
    targetUser = targetUser_temp;

    $("input[id='click']").click(printMe_qm);

    if (targetUser == "junreyd") {
        $('#click').show();
    }

}






(function () {

    $.ajax({
        url: `${_spPageContextInfo.webAbsoluteUrl}/_api/Web/Lists(guid'aa4ef5d1-2a45-4aee-8dc6-1fa297c76111')/items?$select=Id,Document_x0020_ID,FileRef,Clause/Title&$expand=Clause,ContentType&$orderby=Clause/Title asc&$top=5000`,
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose",
            "content-type": "application/json;odata=verbose"
        },
        success: function (data_all) {
            qms_data = data_all.d.results;

            forqms = [];

            for (let i = 0; i < qms_data.length; i++) {
                forqms.push(qms_data[i]);
            }



        },
        error: function (error) {
            console.log(error);
        }
    });

})();






function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
    // temp_month_arr = forqms.filter(onlyUnique);
}






function printMe_qm() {

    for (let i = 0; i < forqms.length; i++) {



        // var Id = forqms[i].Id;
        // var document_id_string = forqms[i].Document_x0020_ID;
        // var document_name_string = forqms[i].FileRef;
        // var document_section_number = forqms[i].Clause.Title.replace(/[^\d.-]/g, '');
        // str = document_name_string.substring(16, document_name_string.lastIndexOf("."));
        // substring = "QM";
        // var strFirstSecond = document_id_string.substring(0, 2);
        // each_sub = ["BM", "OC", "FG"];



        // if (strFirstSecond === substring || each_sub.some(el => document_id_string.includes(el))) {


        // $.ajax({
        //     url: `${_spPageContextInfo.webAbsoluteUrl}/_layouts/15/versions.aspx?list={aa4ef5d1-2a45-4aee-8dc6-1fa297c76111}&ID=${Id}`,
        //     method: "GET",
        //     headers: {
        //         "Accept": "application/json; odata=verbose",
        //         "content-type": "application/json;odata=verbose"
        //     },
        //     success: function (data1res) {


        //         console.log(Id);

        //     },
        //     error: function (error) {
        //         console.log(error);
        //     }
        // });


        // }


    }
}








function callback(entries, datas) {

}













//   var validate_ID = versionsUrl.split('ID=').pop();
// var versionsUrl = "https://intranet.houseofit.com.au" + '/_layouts/15/versions.aspx?list=' + "{aa4ef5d1-2a45-4aee-8dc6-1fa297c76111}" + '&ID=' + Id;



// jQuery.get(versionsUrl).done(function (data1res) {
//     var entries = [];
//     var versionList = $(data1res).find('table.ms-settingsframe');


//     if (typeof (versionList) !== typeof (undefined) && versionList !== null) {
//         versionList.find('tbody > tr').each(function (i, trval) {

//             if (i > 0) {

//                 try {
//                     var verRow = $(this);
//                     var currentRev = verRow.find("table tr > td:contains(Current Rev)").next().text();
//                     var revDate = verRow.find("table tr > td:contains(Rev Date)").next().text();

//                     if (currentRev !== "" && (revDate !== null && revDate.length > 0)) {

//                         c_Rev = currentRev.trim();
//                         r_Date = revDate.trim();


//                         var entry = {
//                             Current_Revision: c_Rev,
//                             Revision_Date: r_Date
//                         };
//                         entries.push(entry);

//                     }

//                 } catch (error) {
//                     console.log("parse error " + error.message);
//                 }
//             }
//         });
//     }
//     console.log(entries);

// });











//   $.ajax({
//       url: `${_spPageContextInfo.webAbsoluteUrl}/_layouts/15/versions.aspx?list={aa4ef5d1-2a45-4aee-8dc6-1fa297c76111}&ID=${Id}`,
//       method: "GET",
//       headers: {
//           "Accept": "application/json; odata=verbose",
//           "content-type": "application/json;odata=verbose"
//       },
//       success: function (data1res) {

//           var entries = [];
//           var versionList = $(data1res).find('table.ms-settingsframe');


//           if (typeof (versionList) !== typeof (undefined) && versionList !== null) {
//               versionList.find('tbody > tr').each(function (i, trval) {

//                   if (i > 0) {

//                       try {
//                           var verRow = $(this);
//                           var currentRev = verRow.find("table tr > td:contains(Current Rev)").next().text();
//                           var revDate = verRow.find("table tr > td:contains(Rev Date)").next().text();

//                           if (currentRev !== "" && (revDate !== null && revDate.length > 0)) {

//                               c_Rev = currentRev.trim();
//                               r_Date = revDate.trim();


//                               var entry = {
//                                   Current_Revision: c_Rev,
//                                   Revision_Date: r_Date
//                               };
//                               entries.push(entry);

//                           }

//                       } catch (error) {
//                           console.log("parse error " + error.message);
//                       }
//                   }
//               });
//           }
//           // console.log(entries);

//       },
//       error: function (error) {
//           console.log(error);
//       }
//   });
