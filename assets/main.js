function submitComment() {
    $("#content").hide();
    $("#loading").fadeIn();
    update = {
        'ticket': {
            'comment': {
                'body': $('#message').val(),
                'public': false
            }
        }
    }
    update_settings = {
        url: '/api/v2/tickets/' + document.ticket_id + '.json',
        type: 'PUT',
        dataType: 'json',
        data: update
    };
    document.client.request(update_settings).then(
    function(data) {
        $("#loading").fadeOut();
        $("#content").show();
    },
    function(response) {
        showError(response);
    });
}

function displayComment(client) {
    var source = $("#comment-template").html();
    var template = Handlebars.compile(source);
    var html = template();
    $("#content").html(html);
    $("#submitButton").click(submitComment);
}

function showError(response) {
    var error_data = {
        'status': response.status,
        'statusText': response.statusText
    };
    var source = $("#error-template").html();
    var template = Handlebars.compile(source);
    var html = template(error_data);
    $("#content").html(html);
}

$(function() {
    var client = ZAFClient.init();
    client.invoke('resize', {
        width: '100%',
        height: '200px'
    });
    document.client = client;
    client.get('ticket.id').then(function(data) {
        document.ticket_id = data['ticket.id'];
        displayComment(client);
    });
    //showError();
});