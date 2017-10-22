#!/usr/bin/env node

const program = require('commander')

program
	.version('0.0.1')
	.command('status [option]', 'Show the status of repo')
	.command('init', 'Initialize rick repo')
	.command('add', 'Add files to staging Area')
	.command('commit', 'Commit files in the staging area')
	.command('checkout <commitId>', 'Apply a commit')
	.command('history', 'Show rick history')
	.parse(process.argv)
