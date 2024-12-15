#!/bin/bash
pdflatex -synctex=1 -interaction=nonstopmode -shell-escape IPleiriaMain
biber IPleiriaMain
makeglossaries IPleiriaMain
