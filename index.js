var client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt')
var publishTopic = document.getElementById('topic')
var message = document.getElementById('payload')
var d = new Date();
var Topic = document.getElementById('topic').value;
var Payload = document.getElementById('payload').value;

client.on('message', function(Topic, Payload) {
    $("#tMessage tbody").prepend("<tr><td>" + Topic + "</td><td>" + Payload + "</td><td>" + d.toUTCString() + "</td></tr>")

})
$('#ClearIncomingTable').click(function(){
    $('#tMessage tbody').empty()
})
$(document).ready(function() {
    $('#connect').click(function() {
        $('#status').val("Connecting...").css("color", "blue")
        client.on('connect', function() {
            $('#status').val("Connected!").css("color", "green")
        })
        $('#published').click(function() {
            client.publish(publishTopic.value, message.value)
            $("#publishedTable tbody").prepend("<tr><td>" + publishTopic.value + "</td><td>" + message.value + "</td><td>" + d.toUTCString() + "</td></tr>")
        })
        $('#ClearPublished').click(function(){
            $('#publishedTable tbody').empty()
        })
        $('#subscribe').click(function() {
            client.subscribe(subtopic.value)
            $("#subscribeTable tbody").prepend("<tr><td>" + subtopic.value + "</td><td>" + d.toUTCString() + "</td></tr>")
        })
        $('#unsubscribe').click(function() {
            var tables = $('#subscribeTable tbody tr').children()
            $(tables).each(function(index, value) {
                if ($(value).text() == $('#subtopic').val()) {
                    $(value).parent().remove();
                    client.unsubscribe($('#subtopic').val())
                }
            })
        })
        $('#Clear').click(function(){
            $('#subscribeTable tbody').empty()
        })
    })
    $('#disconnect').click(function() {
        $('#status').val("Disconnected!").css("color", "red")
        client = "";
    })
})