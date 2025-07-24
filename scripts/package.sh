#!/bin/bash

# packager

compile() {
    mkdir -p build

    # Build the app
    ./scripts/tcpkg build app.idx -override=true
}

daemon() {
    chsum1=""

    while [[ true ]]
    do
        chsum2=`find src/apps -type f -exec md5 {} \;`
        if [[ $chsum1 != $chsum2 ]] ; then           
            if [ -n "$chsum1" ]; then
                compile
            fi
            chsum1=$chsum2
        fi
        sleep 0
    done
}

compile

if [[ $1 == "--watch" ]]
then
    daemon
fi