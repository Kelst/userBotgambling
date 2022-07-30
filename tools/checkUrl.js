module.exports=(url)=> {
         var regURL = /^(?:(?:https?|ftp|telnet):\/\/(?:[a-z0-9_-]{1,32}(?::[a-z0-9_-]{1,32})?@)?)?(?:(?:[a-z0-9-]{1,128}\.)+(?:com|net|org|mil|edu|arpa|ru|gov|biz|top|info|aero|inc|name|live|ua|[a-z]{2})|(?!0)(?:(?!0[^.]|255)[0-9]{1,3}\.){3}(?!0|255)[0-9]{1,3})(?:\/[a-z0-9.,_@%&{*!^_``"`}%)[\]?+=\~\/-]*)?(?:#[^ \'\"&<>]*)?$/i;

    return regURL.test(url);
}
