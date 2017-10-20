#!/usr/bin/env node

const program = require('commander')

program
	.version('0.0.1')
	.command('status [option]', 'Show the status of repo')
	.command('init', 'Initialize rick repo')
	.parse(process.argv)
