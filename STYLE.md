## Variable Names
* camelCase naming
* Global variables written in UPPERCASE


## Spaces Around Operators
* Put spaces around operators: <br></br>

``` a = b + c ```
## Code indentation (python)
* Always use 1 tab for indentation of code blocks: <br></br>
```javascript
function toCelsius(fahrenheit) {
        return (5 / 9) * (fahrenheit - 32);
       } 
 ```

## Statement rules (javascript & D3)
* Always end simple statement with semicolons
* Put the opening bracket at the end of the first line.
* Use one space before the opening bracket.
* Put the closing bracket on a new line, without leading spaces. 
* Do not end a complex statement with a semicolon. 
```javascript
function toCelsius(fahrenheit) {
        return (5 / 9) * (fahrenheit - 32);
       } 
 ```

* Each method on its own indented line:
`
```javascript
var provinces = map.selectAll(".provinces")
    .data(topojson.feature(europe, europe.objects.FranceProvinces).features)
    .enter()
    .append("g")
 ```

 ## Line Length < 80
 To ensure readability, lines will not be longer than 80 characters
