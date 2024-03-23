let cachedData = `name,alias,title,media,actor
Helen Harris,Aech,Ready Player One,film,Lena Waithe
Alec Hardison,,Leverage,television,Aldis Hodge
Brody Nelson,,CSI: Cyber,television,Shad Moss
Victor Stone,Cyborg,Justice League,film,Ray Fisher
Glen Whitmann,,Transformers,film,Anthony Anderson
Gus Gorman,,Superman III,film,Richard Pryor
,Hush,Escape Plan,film,50 Cent
Johnny Storm,Human Torch,Fantastic Four,film,Michael B. Jordan
Leslie Romero,,Mr. Robot,television,Ron Cephas Jones
Leon Rollins,Latrell Walker,Exit Wounds,film,Earl 'DMX' Simmons
Paul Cook,Lord Nikon,Hackers,film,Laurence Mason
Lucius Fox,,Batman Returns,film,Morgan Freeman
Luthor Stickell,,Mission: Impossible,film,Ving Rhames
,Morpheus,The Matrix,film,Laurence Fishburne
,Niobe,The Matrix,film,Jada Pinkett Smith
Ramsey,,Fast and Furious,film,Nathalie Emmanuel
Riley Davis,,McGyver,television,Tristin Mays
Shuri,Black Panther,Black Panther,film,Letitia Wright
Steve,,Office Space,film,Orlando Jones
,Tank,The Matrix,film,Marcus Chong
Theo,,Die Hard,film,Clarence Gilyar
,Link,The Matrix,film,Harold Perrineau
Miles Dyson,,Terminator 2,film,Joe Morton
Sticky Webb,,The Proud Family,television,Orlando Brown
Curtis Holt,Mr. Terrific,Arrow,television,Echo Kellum
Breanna Casey,,Leverage: Redemption,television,Aleyse Shannon
Riri Williams,Iron Heart,Black Panther: Wakanda Forever,film,Dominique Thorne
Richmond Valentine,,Kingsman: The Secret Service,film,Samuel L. Jackson
Leslie,Nine Ball,Ocean's 8,film,Rihanna
Bernard Lowe,,Westworld,television,Jeffrey Wright
John Raymond 'Ray' Arnold,,Jurrasic Park,film,Samuel L. Jackson`;


let data;

function csvToJson(csv: string) {
    // Split the input into lines
    let lines = csv.split('\n');
  
    // Extract headers
    let headers = lines[0].split(',').map(header => header.trim());
  
    // Remove the headers from the lines array
    lines.shift();
  
    // Map the remaining lines into objects
    let jsonResult = lines.map(line => {
      // Split the line into values, trim each value
      let values = line.split(',').map(value => value.trim());
  
      // Create an object for the line
      let obj = headers.reduce((accumulator, header, index) => {
        // Remove quotes from the value if present
      //   let cleanValue = values[index].replace(/^"|"$/g, '');
        accumulator[header] = values[index];
        return accumulator;
      }, {});
  
      return obj;
    });
  
    // Filter out any empty lines
    jsonResult = jsonResult.filter(line => Object.keys(line).length > 0);
  
    // Convert the result to a JSON string
    return JSON.stringify(jsonResult);
  }

  try {
    let result = await fetch("https://raw.githubusercontent.com/tobiaswright/black-programmers-in-film-and-television/master/list-of-characters.csv")
    // .then(res => res.text());
  
    if (result.ok) {
        data = await result.text()
        console.log("Fresh");
    } else {
        data = cachedData;
        console.log("cachedData");
    }
  } catch(e) {
    data = cachedData;
    console.log("cachedData");
    console.log(e)
  }


  export let items = JSON.parse(csvToJson(data as string))