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
Shuri,Black Panther,Black Panther: Wakanda Forever,film,Letitia Wright
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
John Raymond Arnold,Ray Arnold,Jurrasic Park,film,Samuel L. Jackson
Margo Kess,Spider-Byte,Spider-Man: Across the Spider-Verse,film,Amandla Stenberg`;

let data;

interface Items {
	name: string;
    alias: string;
    title: string;
    media: string;
    actor: string; 
}


function csvToJson(csv: string) {
  const lines = csv.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  lines.shift(); // Remove headers
  lines.pop();
  const jsonResult = lines.map(line => {
    const values = line.split(',').map(value => value.trim());
    const obj: Record<string, string> = {};

    headers.forEach((header, index) => {
      // const cleanValue = values[index].replace(/^"|"$/g, ''); // Remove quotes
      obj[header] = values[index];
    });

    return obj as unknown as Items;
  });

  // Filter out any empty lines
  const filteredJsonResult = jsonResult.filter(line => Object.keys(line).length > 0);

  // Sort by ascending
  filteredJsonResult.sort((a, b) => {
    let nameA = a.alias ? a.alias!.toLowerCase() : a.name!.toLowerCase();
    let nameB = b.alias ? b.alias!.toLowerCase() : b.name!.toLowerCase();
  
    return nameA.localeCompare(nameB)
  })

  // Convert the result to a JSON string
  return filteredJsonResult; // Pretty-print with 2 spaces
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
    console.log(e)
  }

  export let getList = () => {
     return csvToJson(data);
  }