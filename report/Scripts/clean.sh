#!/bin/bash

find . -maxdepth 1 -type f ! \( -name "*.tex" -o -name "*.cls" \) -delete

find ./Chapters -type f ! \( -name "*.tex" \) -delete
find ./Matter -type f ! \( -name "*.tex" \) -delete

if [ -d "./_minted-IPleiriaMain" ]; then
	rm -rf _minted-IPleiriaMain
fi
