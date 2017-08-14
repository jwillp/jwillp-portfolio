#!/usr/bin/env bash

# This script will run when STARTING the project ""
# Here you might want to cd into your project directory, activate virtualenvs, etc.

# The currently active project is available via $GK_ACTIVE_PROJECT

xamp_start n
alias hcd="cd $projectPath \n"
alias cddoc="cd $projPath/doc \n"
alias cdu="cd $projPath/user \n"
alias grav_update_core="hcd && bin/gpm selfupgrade \n"
alias grav_update_plugins="hcd && bin/gpm update \n"
alias grav_update_all="grav_update_core && grav_update_plugins \n"
