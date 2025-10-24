const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--headless",
      "--disable-gpu",
      "--remote-debugging-port=9222",
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
  });
        
    // Test Case 1: Check for input placeholder.
    const page1 = await browser.newPage();
    try{
    await page1.goto('https://api.example.com/bikeList'); // Replace with your actual test page URL.
    await page1.waitForSelector('table tbody tr', { timeout: 5000 });
    const rowCount = await page1.$$eval('table tbody tr', rows => rows.length, { timeout: 5000 });
    if (rowCount > 0) 
    {
      console.log('TESTCASE:Bikes_table_rows_exist:success');
    } 
    else 
    {
      console.log('TESTCASE:Bikes_table_rows_exist:failure');
    }
    } 
    catch (e) 
    {
        console.log('TESTCASE:Bikes_table_rows_exist:failure');
    }

    const page2 = await browser.newPage();
    try {
      await page2.goto('https://api.example.com/addBike'); // Replace with your actual test page URL
  
      // Test Case: Check if the form exists and has required input fields
      const formExists = await page2.evaluate(() => {
        const form = document.querySelector('form');
        const inputFields = ['brand', 'model', 'type', 'costPerDay', 'contactNumber'];
        const formHasInputFields = inputFields.every(field => !!form.querySelector(`[formControlName="${field}"]`));
        return !!form && formHasInputFields;
      });
  
      if (formExists) {
        console.log('TESTCASE:Bike_form_exists_and_has_required_fields:success');
      } else {
        console.log('TESTCASE:Bike_form_exists_and_has_required_fields:failure');
      }
    } catch (e) {
      console.log('TESTCASE:Bike_form_exists_and_has_required_fields:failure');
    }
  
   
    const page3 = await browser.newPage();
    try {
      await page3.goto('https://api.example.com/addBike'); // Replace with your actual test page URL
      await page3.setViewport({
        width: 1200,
        height: 1200,
      });
  
    // Wait for the form to be rendered
    await page3.waitForSelector('form');

    // Check for the button with type submit and text "Add Bike"
    const submitButton = await page3.$('button[type="submit"]');
  
    if (submitButton) {
      const buttonText = await page3.evaluate(button => button.textContent.trim(), submitButton);
      const isButtonCorrect = buttonText === 'Add Bike';
      if (isButtonCorrect) {
        console.log('TESTCASE:Submit_button_exists_and_has_correct_name:success');
      } else {
        console.log('TESTCASE:Submit_button_exists_and_has_correct_name:failure');
      }
    } else {
      console.log('TESTCASE:Submit_button_exists_and_has_correct_name:failure');
    }
  } catch (error) {
    console.log('TESTCASE:Submit_button_exists_and_has_correct_name:failure');
  } 

  const page4 = await browser.newPage();
    try {
      await page4.goto('https://api.example.com/bikeList'); // Replace with your actual test page URL
      await page4.setViewport({
        width: 1200,
        height: 1200,
      });
  
      await page4.waitForSelector('table');
      await page4.waitForSelector('button');
      const deleteButtons = await page4.$$('table tbody tr button');

      if (deleteButtons.length > 0) {
        const isDeleteButtonCorrect = await Promise.all(
          deleteButtons.map(async (button) => {
            const buttonText = await page4.evaluate(button => button.textContent.trim(), button);
            return buttonText === 'Delete';
          })
        );
  
        if (isDeleteButtonCorrect.every(isCorrect => isCorrect)) {
          console.log('TESTCASE:Delete_button_exists_and_has_correct_text:success');
        } else {
          console.log('TESTCASE:Delete_button_exists_and_has_correct_text:failure');
        }
      } else {
        console.log('TESTCASE:Delete_button_exists_and_has_correct_text:failure');
      }
    } catch (error) {
      console.log('TESTCASE:Delete_button_exists_and_has_correct_text:failure');
    }

    const page5 = await browser.newPage();
    try {
      await page5.goto('https://api.example.com/bikeList'); // Replace with your actual test page URL
  
      // Wait for the table to be rendered
      await page5.waitForSelector('table', { timeout: 5000 });
  
      // Extract table headers
      const tableHeaderContent = await page5.evaluate(() => {
        const thElements = Array.from(document.querySelectorAll('table thead th'));
        return thElements.map(th => th.textContent.trim());
      });
  
      // Define the expected headers
      const expectedHeaders = ['Bike ID', 'Brand', 'Model', 'Type', 'Cost Per Day', 'Available Status', 'Contact Number', 'Actions'];
  
      // Check if all expected headers are present
      const headerMatch = expectedHeaders.every(header => tableHeaderContent.includes(header));
  
      if (headerMatch) {
        console.log('TESTCASE:Table_headers_exist_and_have_correct_text:success');
      } else {
        console.log('TESTCASE:Table_headers_exist_and_have_correct_text:failure');
      }
  
    } catch (e) {
      console.log('TESTCASE:Table_headers_check:failure');
    } 

    const page6 = await browser.newPage();
    try {
      await page6.goto('https://api.example.com/bikeList'); // Replace with your actual test page URL
      const sortByButton = await page6.$('button');
      if (sortByButton) {
        const sortByButtonText = await page6.evaluate(button => button.textContent.trim(), sortByButton);
        if (sortByButtonText === 'Sort by Price') {
          console.log('TESTCASE:Sort_by_Price_button_exists_and_has_correct_text:success');
        } else {
          console.log('TESTCASE:Sort_by_Price_button_exists_and_has_correct_text:failure');
        }
      } else {
        console.log('TESTCASE:Sort_by_Price_button_exists_and_has_correct_text:failure');
      }
    } catch (e) {
      console.log('TESTCASE:Sort_by_Price_button_check:failure');
    }  

finally {
  await page1.close();
  await page2.close();
  await page3.close();
  await page4.close();
  await page5.close();  
  await page6.close();
  await browser.close();
  }
})();

