class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this._state = 100;
    this.type = null;
  }

  fix() {
    this.state *= 1.5;
  }

  set state(newState) {
    if (newState < 0) {
      this._state = 0;
    } else if (newState > 100) {
      this._state = 100;
    } else {
      this._state = newState;
    }
  }

  get state() {
    return this._state;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = "magazine";
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = "book";
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "detective";
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    const foundBook = this.books.find(book => book[type] === value);
    return foundBook || null;
  }

  giveBookByName(bookName) {
    const index = this.books.findIndex(book => book.name === bookName);
    if (index !== -1) {
      const book = this.books[index];
      this.books.splice(index, 1);
      return book;
    } else {
      return null;
    }
  }
}

const myLibrary = new Library("Городская библиотека");

myLibrary.addBook(new FantasticBook("Рэй Брэдбери", "451 градус по Фаренгейту", 1953, 232));
myLibrary.addBook(new DetectiveBook("Агата Кристи", "Убийство в Восточном экспрессе", 1934, 256));
myLibrary.addBook(new NovelBook("Лев Толстой", "Война и мир", 1869, 1225));

let book1919 = myLibrary.findBookBy("releaseDate", 1919);
if (!book1919) {
  console.log("Книга 1919 года не найдена. Создаем новую...");
  myLibrary.addBook(new NovelBook("Стефан Цвейг", "Амок", 1919, 150));
}

const issuedBook = myLibrary.giveBookByName("Война и мир");
console.log("Выдана книга:", issuedBook.name);
console.log("Книг в библиотеке осталось:", myLibrary.books.length);

issuedBook.state = 20; 
console.log("Состояние книги после повреждения:", issuedBook.state);

issuedBook.fix();
console.log("Состояние книги после фикса:", issuedBook.state);

myLibrary.addBook(issuedBook);
console.log("Книг в библиотеке после возврата:", myLibrary.books.length); 