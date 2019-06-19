
function getFullHostName()
{
    var http = location.protocol;
    var slashes = http.concat("//");
    return slashes.concat(window.location.hostname);
}