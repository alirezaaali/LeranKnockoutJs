
function WebmailViewModel() {
    // Data
    var self = this;
    self.folders = ['Inbox','Stars','Archive', 'Sent', 'Spam'];
    self.chosenFolderId = ko.observable();
    self.chosenFolderData = ko.observable();
    self.chosenMailData = ko.observable();
    
    //self.goToFolder('Inbox'); //or any default folder
    
    
    //Behaviours
    /*
    //the goToFolder and goToMail functions directly triggered Ajax requests and updated the viewmodel state
    self.goToFolder = function(folder){
                        self.chosenFolderId(folder);
                        self.chosenMailData(null);
                        $.get('/mail', {folder: folder}, self.chosenFolderData);
                        };
     self.goToMail = function(mail){
                         self.chosenFolderId(mail.folder);
                         self.chosenFolderData(null);
                         $.get("/mail",{mailId:mail.id},self.chosenMailData);
                        
     };
     */
     /*
     they merely trigger client-side navigation.
     Separately, we'll use Sammy to detect client-side navigation and then do the Ajax
     requests and update the viewmodel state.
     This indirection means that if the user triggers client-side navigation
     by a different means (e.g., clicking back), the corresponding viewmodel
     updates will still occur.
     */
     
     self.goToFolder = function(folder){location.hash = folder};
     self.goToMail = function(mail){location.hash = mail.folder +'/' + mail.id};
     
     Sammy(function() {
             this.get('#:folder',function(){
                     self.chosenFolderId(this.params.folder);
                     self.chosenMailData(null);
                     $.get("/mail",{folder: this.params.folder}, self.chosenFolderData);
             });
             
             this.get('#:folder/:mailId',function(){
                     self.chosenFolderId(this.params.folder);
                     self.chosenFolderData(null);
                     $.get("/mail",{mailId:this.params.mailId}, self.chosenMailData);
             });
             this.get('',function() {this.app.runRoute('get','#Inbox')});
     }).run();
};

ko.applyBindings(new WebmailViewModel());