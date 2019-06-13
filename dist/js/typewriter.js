// import (spawn) from "child_process";

const TypeWriter = function(txtElement, words, wait = 3000) {
  this.txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

// Type Method
TypeWriter.prototype.type = function() {
  const current = this.wordIndex % this.words.length;

  const fullTxt = this.word[current];

  // Check If deleting
  if (this.isDeleting) {
    // Remove Char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //    add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  // Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Type speed
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // If word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // Make pause at end
    typeSpeed = this.wait;
    // Set Delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    // Move to next word
    this.wordIndex++;
    // Pause before start typing

    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

// Init On Dom Load
document.addEventListener("DOMcontentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-words");
  // Init Typewriter
  new TypeWriter(txtElement, words, wait);
}
