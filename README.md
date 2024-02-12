## Check nodejs vs go

| try | node v20 | golang 1.21 | comment                                                     |
| --- | -------- | ----------- | ----------------------------------------------------------- |
| 1   | 688ms    | 1210ms      | gc going crazy after free logs strings                      |
| 2   | 824ms    | 225ms       | add string builder in go, try join arrays of string in node |
| 2   | ~690ms   | 159ms       | move generate users to chanel                               |
