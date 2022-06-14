(() => {
   // получаем данные из Локального Хранилища   
   function getItemStorage(keyStorage) {
      return JSON.parse(localStorage.getItem(keyStorage));
   }
   // записываем данные в Локальное Хранилище   
   function setItemStorage(keyStorage, dataStorage) {
      localStorage.setItem(keyStorage, JSON.stringify(dataStorage));
   }

   // форматирование времени
   function toIsoString(date) {
      let tzo = -date.getTimezoneOffset(),
         dif = tzo >= 0 ? '+' : '-',
         pad = function (num) {
            return (num < 10 ? '0' : '') + num;
         };

      return date.getFullYear() +
         '-' + pad(date.getMonth() + 1) +
         '-' + pad(date.getDate()) +
         'T' + pad(date.getHours()) +
         ':' + pad(date.getMinutes()) +
         ':' + pad(date.getSeconds()) +
         dif + pad(Math.floor(Math.abs(tzo) / 60)) +
         ':' + pad(Math.abs(tzo) % 60);
   }

   // создаём контейнер и заголовок с формой(form) в нём
   function createFormContr() {
      const formContr = document.createElement('div');
      const form = document.createElement('form');
      const titleForm = document.createElement('h3');

      formContr.classList.add('contr-form');
      form.classList.add('form');
      titleForm.classList.add('form__title');

      formContr.append(titleForm);
      formContr.append(form);

      return {
         formContr,
         form,
         titleForm,
      }
   }
   // создаём лэйбел содержащий поле и текст
   function createInputItems() {
      const contrInput = document.createElement('label');
      const textInput = document.createElement('span');
      const input = document.createElement('input');

      contrInput.classList.add('form__contr');
      textInput.classList.add('form-label', 'form__input-text');
      input.classList.add('form-control');

      contrInput.append(textInput);
      contrInput.append(input);

      return {
         contrInput,
         textInput,
         input,
      }
   }

   // проверяем пустые поля или нет
   function checkEmptyInput(checkInput, index) {
      const input = checkInput[index];

      if (checkInput[index].value.trim() === '') {

         input.classList.remove('input-valid');
         input.classList.add('input-invalid');
         input.nextSibling.textContent = 'Поле не должно быть пустым';
         input.value = '';
         return false;

      } else {
         input.classList.remove('input-invalid');
         return true;
      }
   }
   // создаём массив из строк без пробелов
   function deleteSpaces(checkInput, index) {
      const inputValue = checkInput[index].value
         .split(' ')
         .map(str => str.trim())
         .filter(text => text.length > 0);
      return inputValue;
   }

   // создаём поля ввода для формы добавления студента
   function createInputsAddForm(formContr) {
      for (let i = 0; i < 4; ++i) {
         let inputItems = createInputItems();
         // доьбавляем общие классы и атрибуты для полей добавления студента
         inputItems = addGeneralDataInput(inputItems);

         switch (i) {
            case 0:
               // доьбавляем уникальные  классы и атрибуты для полей добавления студента
               inputItems = addUniqueDataInput(
                  inputItems, 'ФИО', 'Поле не должно быть пустым',
                  'Всё верно!', 'student', 'Иванов Иван Иванович');
               break;
            case 1:
               // доьбавляем уникальные  классы и атрибуты для полей добавления студента
               inputItems = addUniqueDataInput(
                  inputItems, 'Факультет', 'Поле не должно быть пустым',
                  'Всё верно!', 'faculty', 'Овощеводство');
               break;
            case 2:
               inputItems = addUniqueDataInput(
                  inputItems, 'Факультет', 'Поле не должно быть пустым',
                  'Всё верно!', 'date', '31.12.2000', 'date', '1900-01-01');
               break;
            case 3:
               inputItems = addUniqueDataInput(
                  inputItems, 'Факультет', 'Поле не должно быть пустым',
                  'Всё верно!', 'year', '2000', 'number', '2000');
               break;
         }
         const contrInput = inputItems.contrInput
         contrInput.append(inputItems.invalidInput);
         contrInput.append(inputItems.validInput);
         formContr.append(contrInput);
      }
      return formContr;
   }
   // доьбавляем общие классы и атрибуты для полей добавления студента
   function addGeneralDataInput(items) {
      const contrInput = items.contrInput;
      const textInput = items.textInput;
      const input = items.input;
      const invalidInput = document.createElement('span');
      const validInput = document.createElement('span');

      input.type = 'text';
      input.required = 'required';

      contrInput.classList.add('mb-3', 'add-student__contr');
      textInput.classList.add('add-student__input-text');
      input.classList.add('add-student__input');
      invalidInput.classList.add('form-text', 'add-student__input-invalid');
      validInput.classList.add('form-text', 'add-student__input-valid');
      return {
         contrInput,
         textInput,
         input,
         invalidInput,
         validInput,
      }
   }
   // доьбавляем уникальные  классы и атрибуты для полей добавления студента
   function addUniqueDataInput(
      items, inputText, textInvalid, textValid, name, placeholder, type, min) {

      const textInput = items.textInput;
      const input = items.input;
      const invalidInput = items.invalidInput;
      const validInput = items.validInput;

      textInput.textContent = inputText;
      invalidInput.textContent = textInvalid;
      validInput.textContent = textValid;
      input.name = name;
      input.placeholder = placeholder;

      if (type != null) {
         input.type = type;
         input.min = min;
         let max = new Date();
         type === 'date' ?
            max = toIsoString(max).split("T")[0] :
            max = toIsoString(max).split("T")[0].split("-")[0];
         input.max = max;
      }
      return items;
   }
   // создаём форму добавления студента в таблицу
   function createFormAdd() {
      const contrItems = createFormContr()
      let formContr = contrItems.formContr;
      let form = contrItems.form;
      const titleForm = contrItems.titleForm;
      const btnForm = document.createElement('button');

      formContr.classList.add('add-student');
      form.classList.add('add-student__form');
      titleForm.classList.add('add-student__title');
      btnForm.classList.add('btn', 'btn-primary', 'add-student__btn');

      titleForm.textContent = 'Добавьте студента в таблицу';
      btnForm.textContent = 'Добавить студента';

      form.name = 'addStudent';
      btnForm.addEventListener('click', (e) => btnValidate(e));

      // получаем поля ввода для формы добавления студента
      form = createInputsAddForm(form);
      form.append(btnForm);
      formContr.append(titleForm);
      formContr.append(form);

      return formContr;
   }
   // валидация форм по нажатию на кнопку
   function btnValidate(e) {
      const inputsAddStudent = document.querySelectorAll('.add-student__input');
      const objStudent = {};

      // валдиция всх 4 полей по очереди
      for (let i = 0; i < 4; ++i) {
         switch (i) {
            case 0:
               // проверка пустое поле или нет
               if (checkEmptyInput(inputsAddStudent, i)) {
                  const input1 = inputsAddStudent[i];
                  // создаём массив из строк без пробелов
                  const inputValue1 = deleteSpaces(inputsAddStudent, i);
                  // проверяем три ли слова (ФИО)   
                  if (inputValue1.length === 3) {
                     // все слова делаем с большой буквы
                     const arrNameStudent = inputValue1
                        .map(str => str = str.slice(0, 1).toUpperCase() + str.slice(1));
                     // наполнить объект
                     for (let i = 0; i < 3; ++i) {
                        switch (i) {
                           case 0:
                              objStudent.surname = arrNameStudent[i];
                              break;
                           case 1:
                              objStudent.name = arrNameStudent[i];
                              break;
                           case 2:
                              objStudent.lastname = arrNameStudent[i];
                              break;
                        }
                     }
                     // добавляем в поле верное значение 
                     input1.value = arrNameStudent.join(' ');
                     // индикатор что поле полностью валидное  
                     input1.classList.add('input-valid');
                  } else {
                     // подсказываем как исправить ошибку 
                     input1.classList.remove('input-valid');
                     input1.classList.add('input-invalid');
                     input1.nextSibling.textContent = 'Введите значение в формате Иванов Иван Иванович';
                  }
               }
               break;
            case 1:
               // проверка пустое поле или нет
               if (checkEmptyInput(inputsAddStudent, i)) {
                  const input2 = inputsAddStudent[i];
                  // создаём массив из строк без пробелов
                  let inputValue2 = deleteSpaces(inputsAddStudent, i);
                  // первое слово делаем с большой буквы
                  inputValue2 = inputValue2.join(' ');
                  inputValue2 = inputValue2.slice(0, 1).toUpperCase() + inputValue2.slice(1);
                  const faculty = inputValue2;
                  // наполняем объект
                  objStudent.faculty = faculty;
                  // добавляем в поле верное значение
                  input2.value = faculty;
                  // добавляем индикатор что поле полностью валидное
                  input2.classList.add('input-valid');
               }
               break;
            case 2:
               // проверка пустое поле или нет
               if (checkEmptyInput(inputsAddStudent, i)) {
                  const input3 = inputsAddStudent[i];
                  // находится ли дата в нужном промежутке
                  const inputValue3 = input3.value;
                  const startData = new Date('1900-01-01');
                  const finishData = new Date();
                  const inputData = new Date(inputValue3);

                  if ((inputData >= startData) && (inputData <= finishData)) {
                     // добавляем индикатор что поле полностью валидное 
                     input3.classList.add('input-valid');
                     // наполняем объект
                     let date = toIsoString(inputData);
                     objStudent.date = date;
                  } else {
                     // показываем подсказки для прохождения валидации
                     input3.classList.remove('input-valid');
                     input3.classList.add('input-invalid');
                     input3.nextSibling.textContent = 'Введите дату в диапазоне от 01.01.1900 по сегодняшний день';
                  }
               }
               break;
            case 3:
               // проверка пустое поле или нет
               if (checkEmptyInput(inputsAddStudent, i)) {
                  const input4 = inputsAddStudent[i];
                  let currentYear = new Date();
                  currentYear = toIsoString(currentYear).split("-")[0];

                  if ((input4.value >= 2000) && (input4.value <= currentYear)) {
                     // добавляем индикатор что поле полностью валидное 
                     input4.classList.add('input-valid');
                     // наполняем объект
                     objStudent.year = input4.value;
                  } else {
                     // показываем подсказки для прохождения валидации
                     input4.classList.remove('input-valid');
                     input4.classList.add('input-invalid');
                     input4.nextSibling.textContent = 'Введите год в диапазоне от 2000 г. по текущий';
                  }
               }
               break;
         }
      }
      // проверяем прошли ли все инпуты валидацию
      checkValidateInputs(objStudent, e);
   }
   // проверяем прошли ли все инпуты валидацию
   function checkValidateInputs(dataOneStudent, event) {

      const inputs = document.querySelectorAll('.add-student__input');
      const arrInputs = Array.from(inputs);
      // если все инпуты валидны то отправляем форму на сервер
      if (!arrInputs.find(input => input.classList.contains('input-invalid'))) {
         // достаём массив из ЛС
         const arrDataStudents = getItemStorage('studentsData');
         // добавляем в массив готовый объект
         arrDataStudents.push(dataOneStudent);
         setItemStorage('studentsData', arrDataStudents);
      } else {
         event.preventDefault();
      }
   }

   // создаём поля ввода для фильтра таблицы
   function createInputsFilter(inputsContr) {
      for (let i = 0; i < 4; ++i) {
         const inputItems = createInputItems();
         const contrInput = inputItems.contrInput;
         const textInput = inputItems.textInput;
         const input = inputItems.input;

         contrInput.classList.add('mb-3', 'mb-lg-0', 'filter__contr');
         textInput.classList.add('filter__input-text');
         input.classList.add('filter__input');

         switch (i) {
            case 0:
               contrInput.style.minWidth = '280px';
               textInput.textContent = 'По ФИО';
               input.placeholder = 'Ивано...';
               input.type = 'text';
               input.addEventListener('input', () => {
                  setTimeout(activeFilterInputs, 300);
               })
               break;
            case 1:
               contrInput.style.minWidth = '280px';
               textInput.textContent = 'По факультету';
               input.placeholder = 'Овощево...';
               input.type = 'text';
               input.addEventListener('input', () => {
                  setTimeout(activeFilterInputs, 300);
               })
               break;
            case 2:
               textInput.textContent = 'По году начала обучения';
               input.placeholder = '2019';
               input.type = 'number';
               input.min = '2000';
               input.addEventListener('input', () => {
                  setTimeout(activeFilterInputs, 300);
               })
               break;
            case 3:
               textInput.textContent = 'По году окончания обучения';
               input.placeholder = '2023';
               input.type = 'number';
               input.min = '2004';
               input.addEventListener('input', () => {
                  setTimeout(activeFilterInputs, 300);
               })
               break;
         }
         inputsContr.append(contrInput);
      }
      return inputsContr;
   }
   // активируем фильры исходя из значения каждого поля
   function activeFilterInputs() {
      const arrStudents = getItemStorage('studentsData');
      setItemStorage('filterStudentsData', arrStudents);
      const inputsAll = document.querySelectorAll('.filter__input');

      for (let i = 0; i < 4; ++i) {

         switch (i) {
            case 0:
               activeFilterInput(inputsAll[i], inputsAll, 'fullname', 'string');
               break;
            case 1:
               activeFilterInput(inputsAll[i], inputsAll, 'faculty', 'string');
               break;
            case 2:
               activeFilterInput(inputsAll[i], inputsAll, 'year', 'startyear');
               break;
            case 3:
               activeFilterInput(inputsAll[i], inputsAll, 'year', 'finishyear');
               break;
         }
      }
      // отображаем резултат фильтрации
      showResultFilter();
   }
   // првоеряем поля на пустоту
   function checkInputsEmpty(inputs, inputCurrent) {
      emptyInputsValue = Array.from(inputs).every(input => input.value.trim() === '');

      if (!emptyInputsValue) {
         if (inputCurrent.value !== '') {
            return true;
         } else {
            inputCurrent.classList.remove('filter__input_invalid');
            return false;
         }
      } else {
         inputCurrent.classList.remove('filter__input_invalid');
         const arrStudents = getItemStorage('studentsData');
         replaceRowTable(arrStudents);
         return false;
      }
   }
   // активируем фильр для конкретного поля
   function activeFilterInput(currentInput, allInputs, nameProp, typeStr) {
      const emptyInputValue = checkInputsEmpty(allInputs, currentInput);

      if (emptyInputValue) {
         // создаём массив из свойств полученных из ЛС
         const arrPropStudents = createArrPropStudents(nameProp);
         // создаём массив из найденных совпадений подстроки
         const arrFoundText = createArrFoundText(arrPropStudents, currentInput, typeStr);
         // показываем результаты фильтра
         recordResultFilter(arrFoundText, currentInput, nameProp);
      }
   }
   // создаём массив свойств из данных получаемых из ЛС(фильтр)
   function createArrPropStudents(nameCell) {
      const arrStudents = getItemStorage('filterStudentsData');

      return arrStudents.reduce((arrPropStudents, student) => {
         switch (nameCell) {
            case 'fullname':
               propStudent = student.surname + ' ' + student.name + ' ' + student.lastname;
               break;
            case 'faculty':
               propStudent = student.faculty;
               break;
            case 'year':
               propStudent = student.year;
               break;
         }

         if (arrPropStudents.includes(propStudent)) return arrPropStudents;
         return [...arrPropStudents, propStudent];
      }, [])
   }
   // создаём массив из строк(или чисел) соответствующих введённой строке(или числу)
   function createArrFoundText(arrStudentsProp, input, cellName) {

      return arrStudentsProp.reduce((foundText, prop) => {
         // для строк
         if (cellName === 'string') {
            const inputValue = input.value
               .split(' ')
               .filter(text => text.trim().length > 0)
               .join(' ');
            console.log(inputValue)
            if (prop.toLowerCase().includes(inputValue.toLowerCase())) return [...foundText, prop];
            // для чисел
         } else {
            let range;
            // берём из строки только дату
            prop.split('T').shift().split('-')[0];
            cellName === 'startyear' ?
               range = 0 :
               range = 4;
            if ((Number(prop) + range) === Number(input.value)) return [...foundText, prop];
         }

         return foundText;
      }, [])
   }
   // записываем результаты фильтра в ЛС(фильтр)
   function recordResultFilter(arrTextFound, inputCurrent, nameCell) {
      // если введённая строка не найдена
      if (arrTextFound.length === 0) {
         inputCurrent.classList.add('filter__input_invalid');
      } else {
         inputCurrent.classList.remove('filter__input_invalid');
         // если найдены совпадения 
         const arrSortStudents = createArrSotrData(arrTextFound, nameCell);
         setItemStorage('filterStudentsData', arrSortStudents);
      }
   }
   // отображаем резултат фильтрации   
   function showResultFilter() {
      const allInputs = document.querySelectorAll('.filter__input_invalid');

      if (allInputs.length > 0) {
         const tableBody = document.querySelector('tbody');
         const divSearchHelp = createHelpFilter(tableBody)
         tableBody.append(divSearchHelp);
      } else {
         // если найдены совпадения
         const arrSortStudents = getItemStorage('filterStudentsData');
         replaceRowTable(arrSortStudents);
      }
   }
   // создаём сообщение если фильтр ничего не нашёл
   function createHelpFilter(tableBody) {
      const divSearchHelp = document.createElement('div');
      // удаляем текущие ряды в таблице
      tableBody.innerHTML = ''
      divSearchHelp.classList.add('search-help');
      divSearchHelp.textContent = 'Совпадений не найденно...';
      return divSearchHelp;
   }
   // создаём фильтр к таблице
   function createFilterTable() {
      const contrItems = createFormContr();
      const formContr = contrItems.formContr;
      let form = contrItems.form;
      const titleForm = contrItems.titleForm;

      titleForm.textContent = 'Поиск студентов через фильтр';

      formContr.classList.add('filter');
      form.classList.add('filter__form');
      titleForm.classList.add('filter__title');

      // получаем созданные поля ввода для фильтра
      form = createInputsFilter(form);
      formContr.append(titleForm);
      formContr.append(form);

      return formContr;
   }

   // убираем у всех ячеек thead класс
   function removeClassCellHead(searchClass, classActive) {
      const allHeadCell = document.querySelectorAll(searchClass);
      for (let headCell of allHeadCell) {
         headCell.classList.remove(classActive);
      }
   }
   // отображение отсортированного списка по алфавиту и по возрастанию
   function showSortCells(checkNameCell, event) {

      if (event.target.classList.contains('table__head-cell_sort')) {
         removeClassCellHead('.table__head-cell', 'table__head-cell_sort');
         // замена рядов таблицы
         const arrFilterStudents = getItemStorage('filterStudentsData');
         replaceRowTable(arrFilterStudents);

      } else {
         removeClassCellHead('.table__head-cell', 'table__head-cell_sort');
         event.target.classList.add('table__head-cell_sort');
         // и сортируем по алфавиту
         let arrFullNames = sortArrProp(checkNameCell);
         // создаём новый отсортированный массив с данными студентов
         const arrSortStudents = createArrSotrData(arrFullNames, checkNameCell);
         // замена рядов таблицы
         replaceRowTable(arrSortStudents);
      }
   }
   // создаём массив с отсортированными свойствами 
   function sortArrProp(nameCell) {
      const arrStudents = getItemStorage('studentsData');
      let arrProp;
      switch (nameCell) {
         case 'fullname':
            // собираем нужное свойство и пушим в массив
            arrProp = [...createArrProp(arrStudents, 'fullname')];
            // сортируем массив
            arrProp.sort();
            break;
         case 'faculty':            
            // собираем нужное свойство и пушим в массив
            arrProp = [...createArrProp(arrStudents, 'faculty')];
            // сортируем массив
            arrProp.sort();
            break;
         case 'date':
            // отрезаем от строки только дату в формате гггг-мм-дд
            arrProp = [...sliceJustDate(arrStudents, [])];
            // сортируем массив
            arrProp.sort(compareFunction);
            break;
         case 'year':
            // собираем нужное свойство и пушим в массив
            arrProp = [...createArrProp(arrStudents, 'year')];
            // сортируем массив
            arrProp.sort((a, b) => { return a - b });
            break;
      }
      // убираем повторяющиеся свойства
      arrProp = createUniqueList(arrProp);
      // возвращаем массив со св-ми
      return arrProp;
   }
   // собираем нужное свойство и пушим в массив
   function createArrProp(arrStudents, nameProp) {
      let arrProp = [];
      for (let student of arrStudents) {
         switch (nameProp) {
            case 'fullname':
               arrProp.push(student.surname + ' ' + student.name + ' ' + student.lastname);
               break;
            case 'faculty':
               arrProp.push(student.faculty);
               break;
            case 'year':
               arrProp.push(student.year);
               break;
         }
      }
      return arrProp;
   }
   // отризаем от строки только дату в формате гггг-мм-дд
   function sliceJustDate(arrStudentsDate, arrProps) {
      for (let student of arrStudentsDate) {
         let date = student.date;
         date = date.split('T').shift();
         arrProps.push(date);
      }
      return arrProps;
   }
   // функция сравнения для метода sort()
   function compareFunction(a, b) {
      if (a < b) {
         return -1;
      }
      if (a > b) {
         return 1;
      }
      // a должно быть равным b
      return 0;
   }
   // убираем повторяющиеся свойства
   function createUniqueList(arrProp) {
      return arrProp.reduce((uniqueStr, str) => {
         // возвращаем массив без изменений если в нём уже есть эта строка
         if (uniqueStr.includes(str)) return uniqueStr;
         // в противном случае возвращаем новый массив с добавленной в него строкой
         return [...uniqueStr, str];
      }, []);
   }
   // создаём новый отсортированный массив с данными студентов
   function createArrSotrData(arrCellValue, checkNameCell) {
      // получаем текущий порядок рядов в таблице 
      // const arrDataSutents = getItemStorage('studentsData');
      const arrStudentsFilter = getItemStorage('filterStudentsData');
      let arrSortStudents = [];

      for (let i = 0; i < arrCellValue.length; ++i) {

         let arrFilterStudents = arrStudentsFilter.filter((dataStudent) => {
            let propName;
            // проверяем какой столбец мы сортируем
            if (checkNameCell === 'fullname') {
               //получаем свойство из объекта
               propName = dataStudent.surname + ' ' + dataStudent.name + ' ' + dataStudent.lastname;

            } else if (checkNameCell === 'faculty') {
               propName = dataStudent.faculty;

            } else if (checkNameCell === 'date') {
               let prop = dataStudent.date;
               let date = prop.split('T').shift();
               propName = date;

            } else if (checkNameCell === 'year') {
               propName = dataStudent.year;
            }
            // сравниваем строку из объекта со строкой из отсортированного списка
            return propName === arrCellValue[i];
         })
         arrSortStudents = [...arrSortStudents, ...arrFilterStudents];
      }
      return arrSortStudents;
   }
   // замена рядов в таблице
   function replaceRowTable(arrSortList) {
      // заменяем старый список на отсортированный
      const tableBody = document.querySelector('tbody');
      // удаляем текущие ряды в таблице
      tableBody.innerHTML = '';
      // и добавляем отсортированный список
      for (let i = 0; i < arrSortList.length; ++i) {
         // получаем один ряд колонок таблицы     
         const tableRow = createRowTable(arrSortList, i);
         // добавляем этот ряд в тело таблицы
         tableBody.append(tableRow);
      }
   }

   // наполняем thead элементами      
   function createThead() {
      const tableHead = document.createElement('thead');
      const tableRow = document.createElement('tr');

      for (let i = 0; i < 5; ++i) {
         let headCell;

         switch (i) {
            case 0:
               // создаём ячейку шапки катблицы
               headCell = createHeadCell('№');
               break;
            case 1:
               // создаём ячейку шапки катблицы
               headCell = createHeadCell('ФИО', 'fullname', 'table__head-cell');
               break;
            case 2:
               // создаём ячейку шапки катблицы
               headCell = createHeadCell('Факультет', 'faculty', 'table__head-cell');
               break;
            case 3:
               // создаём ячейку шапки катблицы
               headCell = createHeadCell('Дата рождения и возраст', 'date', 'table__head-cell');
               break;
            case 4:
               // создаём ячейку шапки катблицы
               headCell = createHeadCell('Годы обучения', 'year', 'table__head-cell');
               break;
         }
         tableRow.append(headCell);
      }
      tableHead.append(tableRow);
      return tableHead;
   }
   // создаём ячейку thead катблицы
   function createHeadCell(textCell, nameCell, classCell) {
      const headCell = document.createElement('th');
      headCell.scope = 'col';

      headCell.textContent = textCell;
      if (textCell !== '№') {
         headCell.classList.add(classCell);
         headCell.addEventListener('click', (e) => {
            // сортировка ячеек со строковыми названиями по алфавиту
            showSortCells(nameCell, e);
         })
      }
      return headCell;
   }
   // создаём один ряд колонок таблицы
   function createRowTable(arrStudents, j) {
      const tableRow = document.createElement('tr');

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();

      const oneStudent = arrStudents[j];

      // наполняем строку колонками
      for (let i = 0; i < 5; ++i) {
         const headCell = document.createElement('th');
         const dataCell = document.createElement('td');

         dataCell.style.minWidth = '250px'

         switch (i) {
            case 0:
               headCell.scope = 'row';
               headCell.textContent = j + 1;
               break;
            case 1:
               dataCell.classList.add('td-fullname');
               const fullNameStudent = oneStudent.surname + ' ' + oneStudent.name + ' ' + oneStudent.lastname
               dataCell.textContent = fullNameStudent;
               break;
            case 2:
               dataCell.classList.add('td-faculty');
               dataCell.textContent = oneStudent.faculty;
               break;
            case 3:
               dataCell.classList.add('td-date');
               // получаем дату рождения и форматируем её
               const dateStudent = oneStudent.date.split('T')[0];
               const formatDateStudent = dateStudent.split('-').reverse().join('.');
               // вычисляем текущее кол-во лет студента
               const birthYear = oneStudent.date.split('-')[0];
               let ageStudent = currentYear - birthYear;

               // вычисляем был ли уже день рожденье
               // то есть сколько полных лет студенту
               const studentMonth = dateStudent.split('-')[1];
               const studentDay = dateStudent.split('-')[2];

               if ((currentMonth + 1) < studentMonth || currentDay < studentDay) {
                  --ageStudent;
               }
               // подбираем правильное склонение для слова "год"
               const trueWord = selectCorrectWord(ageStudent);

               dataCell.textContent = `${formatDateStudent} (${ageStudent} ${trueWord})`;
               break;
            case 4:
               dataCell.classList.add('td-year');
               const yearStart = Number(oneStudent.year);
               const numberCourse = currentYear - yearStart;
               let statusCourse = ((numberCourse) < 4) ? (numberCourse + 1) + ' курс' : 'закончил(а)';

               // проверяем прошёл ли сентябрь 
               if ((numberCourse === 4) && (Number(currentMonth) + 1) <= 9) {
                  statusCourse = `${numberCourse} курс`;
               }
               dataCell.textContent = `${yearStart}-${yearStart + 4} (${statusCourse})`;
               break;
         }

         if (dataCell.textContent === '') {
            tableRow.append(headCell);
         } else {
            tableRow.append(dataCell);
         }
      }
      return tableRow;
   }
   // подбираем правильное слово для количества лет
   function selectCorrectWord(age) {
      const remain = age % 10;
      if ((age >= 5) && (age <= 20)) {
         return 'лет';
      } else if (remain === 1) {
         return 'год';
      } else if ((remain >= 2) && (remain <= 4)) {
         return 'года';
      } else if ((remain >= 5) || (remain === 0)) {
         return 'лет';
      }
   }
   // наполняем tbody элементами      
   function createTbody() {
      const tableBody = document.createElement('tbody');
      const arrDataStudents = getItemStorage('studentsData');

      if (arrDataStudents.length !== 0) {

         for (let k = 0; k < arrDataStudents.length; ++k) {
            // получаем один ряд колонок таблицы     
            const tableRow = createRowTable(arrDataStudents, k);
            // добавляем этот ряд в тело таблицы
            tableBody.append(tableRow);
         }
      }
      return tableBody;
   }
   // создаём таблицу студентов
   function createTableStudents() {
      const table = document.createElement('table');
      table.classList.add('table');

      // получаем thead наполненный элементами      
      const tableHead = createThead();
      // получаем tbody наполненный элементами      
      const tableBody = createTbody()
      table.append(tableHead);
      table.append(tableBody);

      return table;

   }

   // отрисовываем форму добавления студентов в таблицу
   // и таблицу с фильтрацией и сортировкой
   function renderTableStudent(defaultListStudent) {
      const arrDataStudents = getItemStorage('studentsData');
      // если в ЛС пусто по добавляем туда пустой массив
      if (arrDataStudents == null) {
         const arr = [];
         setItemStorage('studentsData', arr);
         setItemStorage('filterStudentsData', arr);
      } else {
         setItemStorage('filterStudentsData', arrDataStudents);
      }

      const container = document.querySelector('.container');
      const formAddStudent = createFormAdd();
      const formfilter = createFilterTable();
      const tableStudents = createTableStudents();

      container.append(formAddStudent);
      container.append(formfilter);
      container.append(tableStudents);
   }

   window.renderTableStudent = renderTableStudent;

})()