Prem ye tere liye data




<img width="595" height="900" alt="Login page only" src="https://github.com/user-attachments/assets/e0b38dd9-00ba-4702-b8f7-6571c50a7b0d" />
Step 1: Login
User opens the app for the first time.

They see the Login Screen.

They enter their Email and Password and tap Login.

The app sends this information to the backend server for verification.

If successful, the app saves a session token, and the user is taken to the Home Screen. They won't have to log in again unless they log out.

<img width="1917" height="913" alt="Reference for Home page" src="https://github.com/user-attachments/assets/d614d89d-dc0d-4170-8ec8-ef7946740251" />
![WhatsApp Image 2025-07-28 at 12 37 48_a6b319c6](https://github.com/user-attachments/assets/2f2af73e-02ae-4fa0-a761-3701ca554640)

Step 2: Assign Work Bundles

The user is on the Home Screen (Dashboard).

They see a section to "Assign New Work Bundle".

They select a District from the first dropdown menu (e.g., "Amravati").

The app automatically fetches and shows the relevant Talukas for that district in the second dropdown (e.g., "Achalpur", "Daryapur").

The user selects a Taluka (e.g., "Achalpur").

They tap the "Assign Bundle" button.

The app tells the backend to assign this "Amravati/Achalpur" bundle to this user.

The user can repeat this process to assign multiple work bundles.



<img width="1919" height="907" alt="Reference for Data Mangement page" src="https://github.com/user-attachments/assets/51ce549c-b263-4f55-9c05-c9d477c8fbb3" />

Step 3: Sync Data to Device

The user navigates to the Data Management Screen from the drawer menu.

They see a list of all their assigned bundles (e.g., "Amravati/Achalpur").

Next to each bundle, there is a "Sync to Device" button.

The user taps this button for the "Amravati/Achalpur" bundle.

The app shows a loading indicator and starts downloading all the records for that bundle from the backend.

After the download is complete, the app saves all the records into the local SQLite database on the phone.

The screen updates to show how many records are now saved locally for that bundle (e.g., "250 records on device").

Now, the user is fully prepared for field work.


Phase 2: Offline Phase (Field Work)
This is when the user is in a remote area with no internet connection.


<img width="388" height="387" alt="ID search ke bad show hone wala record" src="https://github.com/user-attachments/assets/f07b01f1-f5f3-40f7-a032-c5a44c1c00a4" />

Step 4: Access and Search Data Offline

The user opens the app. They are already logged in.

They go to the Data Management Screen.

They need to find a person's details. They use the Search Bar at the top of the screen.

They start typing the UniqueId of the person they are looking for.

Crucially, the app searches the local SQLite database that was synced in Step 3. It does not need the internet for this.

The search results appear on the screen instantly, showing all the details of the record.

[chhatrapati-sambhajinagar-processed-records-2025-07-26.xlsx](https://github.com/user-attachments/files/21467645/chhatrapati-sambhajinagar-processed-records-2025-07-26.xlsx)

