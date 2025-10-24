#!/bin/bash
export CHROME_BIN=/usr/bin/chromium
if [ ! -d "/home/coder/project/workspace/angularapp" ]
then
    cp -r /home/coder/project/workspace/karma/angularapp /home/coder/project/workspace/;
fi

if [ -d "/home/coder/project/workspace/angularapp" ]
then
    echo "project folder present"
    cp /home/coder/project/workspace/karma/karma.conf.js /home/coder/project/workspace/angularapp/karma.conf.js;
    # checking for add-bike.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/add-bike" ]
    then
        cp /home/coder/project/workspace/karma/add-bike.component.spec.ts /home/coder/project/workspace/angularapp/src/app/add-bike/add-bike.component.spec.ts;
    else
        echo "should create AddBikeComponent FAILED";
        echo "should add a new bike when form is valid FAILED";
        echo "should require all form fields to be filled in FAILED";
        echo "should validate bike contact number format FAILED";
    fi

    # checking for app.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app" ]
    then
        cp /home/coder/project/workspace/karma/app.component.spec.ts /home/coder/project/workspace/angularapp/src/app/app.component.spec.ts;
    else
        echo "should have as title BikeManagementApp FAILED";
    fi

    # checking for bike-list.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/bike-list" ]
    then
        cp /home/coder/project/workspace/karma/bike-list.component.spec.ts /home/coder/project/workspace/angularapp/src/app/bike-list/bike-list.component.spec.ts;
    else
        echo "should create BikeListComponent FAILED";
        echo "should call getBikes FAILED";
        echo "should call deleteBike FAILED";
        echo "should have sortByPrice method FAILED";
        echo "should sort bikes by price FAILED";

    fi

    # checking for bike.service.spec.ts component
    if [ -e "/home/coder/project/workspace/angularapp/src/app/services/bike.service.ts" ]
    then
        cp /home/coder/project/workspace/karma/bike.service.spec.ts /home/coder/project/workspace/angularapp/src/app/services/bike.service.spec.ts;
    else
        echo "should create BikeService FAILED";
        echo "should retrieve bikes from the API via GET FAILED";
        echo "should add a bike via POST FAILED";
        echo "should delete a bike via DELETE FAILED";
    fi

    if [ -d "/home/coder/project/workspace/angularapp/node_modules" ]; 
    then
        cd /home/coder/project/workspace/angularapp/
        npm test;
    else
        cd /home/coder/project/workspace/angularapp/
        yes | npm install
        npm test
    fi 
else   
    echo "should create AddBikeComponent FAILED";
    echo "should add a new bike when form is valid FAILED";
    echo "should require all form fields to be filled in FAILED";
    echo "should validate bike contact number format FAILED";
    echo "should have as title BikeManagementApp FAILED";
    echo "should create BikeListComponent FAILED";
    echo "should call getBikes FAILED";
    echo "should call deleteBike FAILED";
    echo "should create BikeService FAILED";
    echo "should retrieve bikes from the API via GET FAILED";
    echo "should add a bike via POST FAILED";
    echo "should delete a bike via DELETE FAILED";
    echo "should have sortByPrice method FAILED";
    echo "should sort bikes by price FAILED";

fi