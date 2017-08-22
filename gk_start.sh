#!/usr/bin/env bash

# This script will run when STARTING the project ""
# Here you might want to cd into your project directory, activate virtualenvs, etc.

# The currently active project is available via $GK_ACTIVE_PROJECT

xamp_start n

# Change directory alises
alias cdu="cd $projPath/user"
alias cdt="cd $projPath/user/themes"
alias cdp="cd $projPath/user/pages"
alias cdf="cd $projPath/user/config"
alias cdjw="cdt && cd jwillp"

# To get a list of change directory aliases
alias getcd="alias | grep -i $GK_ACTIVE_PROJECT| grep -i cd"

# Compiles front-end files
alias kompile="clear && cdjw && gulp"

# Grav
#gpm
alias gpm="hcd; bin/gpm"
alias grav_update_core="hcd && bin/gpm selfupgrade -f"
alias grav_update_plugins="hcd && bin/gpm update -f"
alias grav_update_all="grav_update_core && grav_update_plugins; alert 'GRAV UPDATE COMPLETE' &"


# DEPLOY ASSETS ON TEST SERVER
alias deploy_test_server='scp -pr "`gk_get_proj_path $GK_ACTIVE_PROJECT`/user/themes/psr/dist" sshmingus@138.197.145.66:/var/www/html/psr/user/themes/psr/dist'


alias deploy_gh="hcd; ./deploy.sh"