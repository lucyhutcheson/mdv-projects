//
//  ViewController.m
//  week4
//
//  Created by Lucy Hutcheson on 8/20/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "ViewController.h"

#define BUTTON_LOGIN 0
#define BUTTON_DATE 1
#define BUTTON_INFO 2

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    
    // Change background color for preference :)
    self.view.backgroundColor = [UIColor colorWithRed:0.714 green:0.812 blue:0.827 alpha:1] /*#b6cfd3*/;

    
    
    /* =========================================================================================================== *
     * LOGIN                                                                                                       *
     * =========================================================================================================== */
    
    /*------------------------------------------------------------------------------------------------------------ *
     * 1. Create a UILabel near the top of your screen with the text "Username:" in it.                            *
     *------------------------------------------------------------------------------------------------------------ */
    
    usernameLabel = [[UILabel alloc] initWithFrame:CGRectMake(10.0f, 5.0f, 320.0f, 40.0f)];    
    if (usernameLabel != nil)
    {
        usernameLabel.backgroundColor = [UIColor colorWithRed:0.714 green:0.812 blue:0.827 alpha:1] /*#293436*/;
        usernameLabel.text = @"Username: ";
        [self.view addSubview:usernameLabel];
    }

    /*------------------------------------------------------------------------------------------------------------ *
     * 2. Create a UITextField to the right of the username label.                                                 *
     *------------------------------------------------------------------------------------------------------------ */
    
    textField = [[UITextField alloc] initWithFrame:CGRectMake(100.0f, 10.0f, 200.0f, 30.0f)];
    if (textField != nil)
    {
        textField.borderStyle = UITextBorderStyleRoundedRect;
        [self.view addSubview:textField];
   }
    
    /*------------------------------------------------------------------------------------------------------------ *
     * 3. Create a rounded rectangle UIButton of any color under the UITextField with the text "Login" on it.      *
     * 5. Add a target to the UIButton to call a function called onClick when the user presses the Login button.   *
     *------------------------------------------------------------------------------------------------------------ */
   
    UIButton *button = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    if (button != nil)
    {
        button.frame = CGRectMake(220.0f, 50.0f, 80.0f, 30.0f);
        button.tintColor = [UIColor colorWithRed:0.6 green:0.2 blue:0.4 alpha:1] /*#993366*/;

        [button setTitle:@"Login" forState:UIControlStateNormal];
        button.tag = BUTTON_LOGIN;
        [button addTarget:self action:@selector(onClick:) forControlEvents:UIControlEventTouchUpInside];
        [self.view addSubview:button];
    }
    
    /*------------------------------------------------------------------------------------------------------------ *
     * 4. Create another UILabel beneath with the default text "Please Enter Username".                            *
     *------------------------------------------------------------------------------------------------------------ */
    
    username2Label = [[UILabel alloc] initWithFrame:CGRectMake(0.0f, 100.0f, 320.0f, 80.0f)];    
    if (username2Label != nil)
    {
        username2Label.backgroundColor = [UIColor colorWithRed:0.161 green:0.204 blue:0.212 alpha:1] /*#293436*/;
        username2Label.text = @"Please Enter Username";
        username2Label.textAlignment = UITextAlignmentCenter;
        username2Label.textColor = [UIColor whiteColor];
        [self.view addSubview:username2Label];
    }

    
    /* =========================================================================================================== *
     * DATE                                                                                                        *
     * =========================================================================================================== */
    
    /*------------------------------------------------------------------------------------------------------------ *
     * 1. Create a UIButton using the rounded rectangle type. Give this button any color you wish.                 *
     * 2. Add the text "Show Date" to the button                                                                   *
     *------------------------------------------------------------------------------------------------------------ */
    
    UIButton *showDatebutton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    if (showDatebutton != nil)
    {
        showDatebutton.frame = CGRectMake(10.0f, 250.0f, 100.0f, 35.0f);
        [showDatebutton setTitle:@"Show Date" forState:UIControlStateNormal];
        showDatebutton.tintColor = [UIColor colorWithRed:0.6 green:0.2 blue:0.4 alpha:1] /*#993366*/;
       
        /*-------------------------------------------------------------------------------------------------------- *
         * 3. Add an action to the button that when clicked, it will call the same onClick handler you             *
         *    already defined. Make sure to add a tag to the date button so you know which one was pressed.        *
         *-------------------------------------------------------------------------------------------------------- */        
        showDatebutton.tag = BUTTON_DATE;
        [showDatebutton addTarget:self action:@selector(onClick:) forControlEvents:UIControlEventTouchUpInside];
        [self.view addSubview:showDatebutton];
    }

    
    /* =========================================================================================================== *
     * INFORMATION                                                                                                 *
     * =========================================================================================================== */
    
    /*------------------------------------------------------------------------------------------------------------ *
     * 1. Create a UIButton using either the light or dark info type and                                           *
     *    position it somewhere near the bottom of the screen.                                                     *
     *------------------------------------------------------------------------------------------------------------ */
    
    UIButton *infobutton = [UIButton buttonWithType:UIButtonTypeInfoDark];
    if (infobutton != nil)
    {
        infobutton.frame = CGRectMake(10.0f, 350.0f, 25.0f, 25.0f);
        infobutton.tag = BUTTON_INFO;
        [infobutton addTarget:self action:@selector(onClick:) forControlEvents:UIControlEventTouchUpInside];
        [self.view addSubview:infobutton];
    }

    /*------------------------------------------------------------------------------------------------------------ *
     * 2. Create a UILabel beneath it that contains no initial text.                                               *
     *------------------------------------------------------------------------------------------------------------ */
    
    infoLabel = [[UILabel alloc] initWithFrame:CGRectMake(0.0f, 380.0f, 320.0f, 60.0f)];    
    if (infoLabel != nil)
    {
        infoLabel.backgroundColor = [UIColor colorWithRed:0.714 green:0.812 blue:0.827 alpha:1] /*#b6cfd3*/;
        infoLabel.numberOfLines = 2;
        infoLabel.textColor = [UIColor whiteColor] /*#4e0c2e*/;
        [self.view addSubview:infoLabel];
    }

    
        
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)onClick:(UIButton*)button
{
    
    /* =========================================================================================================== *
     * LOGIN                                                                                                       *
     * 6. If the user has not entered any text into the UITextField, display in the UILabel,                       *
     *    "Username cannot be empty". Otherwise, display "User: username has been logged in".                      *
     *------------------------------------------------------------------------------------------------------------ */
    if (button.tag == BUTTON_LOGIN)
    {
        NSString *fieldText = textField.text;
        if (fieldText.length == 0)
        {
            username2Label.text = @"Username cannot be empty";
            username2Label.backgroundColor = [UIColor colorWithRed:0.6 green:0.2 blue:0.4 alpha:1] /*#993366*/;
        }
        else 
        {
            username2Label.backgroundColor = [UIColor colorWithRed:0.122 green:0.51 blue:0.545 alpha:1] /*#1f828b*/;
            NSMutableString *loggedText = [NSMutableString stringWithFormat:@"User: %@ has been logged in", fieldText];
            username2Label.text = loggedText;
        }

    }
    else if (button.tag == BUTTON_DATE)
    {
        /* ====================================================================================================== *
         * DATE                                                                                                   *
         * 4. Display a UIAlertView with the current date and time displayed in the format seen                   *
         *    in the dateAlert graphic                                                                            *
         *------------------------------------------------------------------------------------------------------- */
        NSDate *date = [NSDate date];
        NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
        if (dateFormatter != nil)
        {
            [dateFormatter setDateFormat:@"MMMM dd, YYYY hh:mm:ss a zzzz "];
            NSString *dateString = [dateFormatter stringFromDate:date];
            UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"Date" message:dateString delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
            if (alertView != nil)
            {
                [alertView show];
            }
        }
    }
    else if (button.tag == BUTTON_INFO)
    {
        infoLabel.backgroundColor = [UIColor colorWithRed:0.6 green:0.2 blue:0.4 alpha:1] /*#993366*/;
        infoLabel.text = @"This application was created by: Lucy Hutcheson";        
    }
    
    
    /* =========================================================================================================== *
     * END OF PROJECT 4                                                                                            *
     * =========================================================================================================== */

    
    
    
}
- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation != UIInterfaceOrientationPortraitUpsideDown);
}

@end
