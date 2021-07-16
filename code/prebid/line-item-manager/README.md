# Line Item Manager

This folder contains the config file for line item manager, a program to automatically populate Google Ad Manager with line items.

A full description can be found here:
https://docs.prebid.org/tools/line-item-manager.html

The configuration file is bassed off this:

https://github.com/prebid/line-item-manager/blob/master/line_item_manager/conf.d/line_item_manager.yml

So if there is anything extra you think you might need support for check out that file for how to configure everything.

## Installation
In the command line on a system with python3 installed enter:

`pip install line-item-manager`

If that isn't working properly you might have an older version of python set to default so try

`pip3 install line-item-manager`

## Running

Edit `banner_config.yml` or `video_config.yml` with the configurarion you need, or create a new one.

Run `cp gam_creds.json.example gam_creds.json` and populate the `gam_creds.json` whith your Google Ad Manager credentials.

### Dry run
First of all to make sure you have everything set up correctly run

`line_item_manager create my_config.yml --single-order --dry-run`

and check the console for errors

### Test run

Next try a test run and check Google Ad Manager for your new line items

`line_item_manager create my_config.yml --single-order --test-run`

### Live run

If everything looks, good you're ready to run the full script, and populate GAM with your new line items.

`line_item_manager create my_config.yml --single-order`