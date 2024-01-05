# StarWars

// Twoim zadaniem będzie utworzyć aplikację STAR WARS. To Ty decydujesz w jakim miejscu, umieścić elementy na stronie i jak docelowo będą wyglądać. Postaraj się o staranność wizualną oraz poprawność wyświetlania elementów do 1366px. Zachowaj zasady dobrych praktyk. Widok będzie tworzony na podstawie dostarczonego obiektu rowData, który znajduje się w pliku script.js. Wszelką interaktywność trzeba będzie obsłużyć metodami manipulującymi DOM-em.

// A) Przeparsuj zmienną rowData z formatu json, aby powstał obiekt.
// B) Na podstawie kluczy w obiekcie (people, planets, films, species, vehicles, starships) należy stworzyć 6 buttonów i wyświetlić je na stronie. Nazwy kluczy mają być wyciągniete z obiektu, a nie zaharkodowane. Możesz pokusić się o połączenie funkcji Object.keys() i map(). Aplikacja uruchamia się tylko z tymi 6 przyciskami.
// C) Podepnij logikę pod każdy przycisk. Kliknięcie w niego powinno powodować wyświetlenie na stronie tekstu "Tabela", nie jest ważne gdzie, liczy się tylko i wyłącznie funkcjonalność. Przy pierwszym uruchomieniu aplikacji tekst się nie pojawia.
// D) Logikę z poprzedniego zadania zmień następująco. Kliknięcie w przycisk powinno wyświetlić w konsoli dane pobrane na podstawie nazwy klikniętego przycisku. Przykład - klikam w przycisk z tekstem people i w konsoli wyświetlają sie dane z klucza people.
// E) Logikę w przycisku dostosuj tak by kliknięcie w niego tworzyło tabelę z takimi nagłowkami jak:
// - ID
// - 3 dowolne klucze z aktualnie klikniętego obiektu (przykładowo dla pola people będzie to NAME, BIRTH YEAR I GENDER ) - wybierz które
// - CREATED AT
// - ACTIONS
// F) Pod nagłowkami wyświetl wszystkie dane z kategorii kliknietego przycisku
//   -ID - Liczba porządkowa zaczynająca się od 1
//   -3 dowolne wartości np | Luke Skywalker | 19BBY | male |
//   -CREATED AT - wartość pobrana z pola "created" zmieniona na format DD-MM-YYYY. Wartość w polu created:"2014-12-10T15:18:20.704000Z" mają być prezentowane w sposób 10-12-2014
//   -ACTIONS - należy utworzyć dwa przyciski
// G) Pod tabelą dodaj widok zawierąjacy elementy bez obsużonej logiki - widok powinien pojawiać się równocześnie z tabelą. Nie ma tabeli nie ma elementów pod spodem. Te elementy to:
// - Przycisk z ikoną strzałki w lewo,
// - Przycisk z ikoną strzałki w prawo,
// - Z prawej strony powinien znajdować sie przycisk select z wartościami 10 i 20
// - Między strzałkami umieść input z placehodlerem 1
// H) Dodaj logikę do przycisku z koszem, która usunie z tabeli odpowiedni wiersz.
// I) Dodaj logikę do przycisku z plusem. Po kliknięciu w niego, powinno wyświetlić się dodatkowe okno, w którym wyświetlamy wszystkie dane aktualnego wiersza. Może to być dwukolumnowa tabela z nazwą klucza i wartością przypisaną do niego. W przypadku pola people powinny pokazać się takie klucze: birth_year, created, edited, eye_color, films, gender, hair_color, height, homeworld, mass, name, skin_color, species, starships, url, vehicles wraz z odpowiadającymi im wartościami.
// J) W dodatkowym oknie należy umieścić przycisk X i przypisać logikę obsugującą zamknięcie okna
// K) Wewnątrz przysków z koszem umieść checkbox:
// - Użytkownik może zaznaczyć wiele wierszy naraz, zaznaczając ich checkboxy.
// - Gdy co najmniej jeden wiersz jest zaznaczony, pod tabelą pojawia się dodatkowy przycisk. Po kliknięciu wszystkie zaznaczone wiersze zostaną usunięte z tabeli.
// *L) Dodaj wyszukiwarkę po id. Należy utworzyć input, który przyjmie cyfrę. W inpucie powinien wyświetlać się placeholder, odpowiadający zakresowi liczb, które można wpisać. W przypadku buttonu films powinien wyświetlać się placeholder 1 - 6, ponieważ mamy tylko 6 pozycji, w przypadku people będzie to 1 - 82. Obok input-a należy umieścic przycisk z funkcją, która przefiltruje naszą tablice i pozostawi wiersz z indexem, jaki wpisał użytkownik w wyszukiwarkę.
// **M) Dodaj dodaj kolejny rodzaj wyszukiwarki razem z przyciskiem aktywującym jak w poprzednim zadaniu. Filtrowanie powinno działać po polu "name", lub w przypadku filmu po polu "title". Więc tutaj trzeba odpowiednio obłużyć placeholdery warunkowo np Wyszukaj po nazwie, Wyszukaj po tytule. Wyszukiwarka powinna działać na zasadzie wyszukiwania ciągu znaków w całym stringu. Jeżeli wpiszemy literę "b" to powinny wyświetlać się wiersze, w których string z pola name lub title posiada litere "b"
// ** N) Ogranicz wyświetlanie elementów w tabeli na podstawie wybranej wartości w select utworzonym w zadaniu G). Domyślna wartość to 10 więc tabela domyślnie wyświetla również 10 elementów, gdy zostanie wybrana pozycja 20, tabela wyświetli 20 elementów.
// *** O) Do inputa z zadania G) dodaj możliwość wprowadzania liczb z zakresu 1 do liczby stron. Dla przykładu w people jest 82 elementy. Liczba stron będzie wynosiła 9. Obok inputa wyświetl informację ile stron jest dostepnych, czyli np [1] z 9. Wpisanie odpowiedniej liczby w input spowoduje wyświetlenie określonych elementów z odpowiadającej strony. Po wpisaniu 5 wyświetlą się pozycje od 41-50 itp. Przyciski ze strzałkami również należy tutaj obsłużyć, żeby przenosiły na kolejne strony. Natomiast powinny być zablokowane odpowienio lewy - w przypadku, gdy mamy pierwsza strone powinien być nieaktywny i wyszarzony, prawy - gdy jesteśmy na ostatniej stronie.
// *** P) Dodaj dwa przyciski na samej górze aplikacji i zaimplementuj logikę zmieniającą theme (może być z jasnego na ciemny)
// *** R) Dodaj ukrytą funkcjonalność, np po wpisaniu w klawiaturę tekstu "vader", powinniśmy usłyszeć dzwięk -  jeśli chcesz może to być muzyka z filmu Star Wars
// **** S) Dostosuj paginację w taki sposób:
//     - Informacja o liczbie stron dodana obok inputa powinna się zmienić w zależności od wybranej wartości w select.
//     - Gdy liczba stron równa jest 1, przyciski są zablokowane
//     - Gdy jesteśmy np. na stronie 3 lub 4 z domyślną liczbą elementów na stronie (10) - wyświetlane są pozycje 21-30 lub 31-40). Gdy wybierzemy wartość 20 w select wówczas na stronie powinien wyświetlić się zakres (21-40), a numer strony powinien się zmienić na 2. Powinno to działać w dwie strony. Jeżeli zmienimy teraz zakres na 10, liczba strony powinna zmienić się na 3 (21-30