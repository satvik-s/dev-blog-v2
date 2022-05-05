#!/bin/sh

SIZE=$(du -sh .next | grep -o -E "\d+M")
echo "$SIZE"
