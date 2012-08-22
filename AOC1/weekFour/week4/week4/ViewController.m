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

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    
    
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
     *------------------------------------------------------------------------------------------------------------ */
   
    UIButton *button = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    if (button != nil)
    {
        button.frame = CGRectMake(220.0f, 50.0f, 80.0f, 30.0f);
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
        showDatebutton.frame = CGRectMake(10.0f, 250.0f, 100.0f, 40.0f);
        [showDatebutton setTitle:@"Show Date" forState:UIControlStateNormal];
        
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
        [self.view addSubview:infobutton];
    }

    /*
    UIButton *custombutton = [UIButton buttonWithType:UIButtonTypeCustom];
    if (custombutton != nil)
    {
        UIImage *normalImage = [UIImage imageNamed:@"button.jpg"];
        UIImage *highlightlImage = [UIImage imageNamed:@"button-highlight.jpg"];
        
        [custombutton setImage:normalImage forState:UIControlStateNormal];
        [custombutton setImage:highlightlImage forState:UIControlStateHighlighted];
        custombutton.frame = CGRectMake(80.0f, 180.0f, 100.0f, 100.0f);
        [self.view addSubview:custombutton];
    }

    
    UIButton *addbutton = [UIButton buttonWithType:UIButtonTypeContactAdd];
    if (addbutton != nil)
    {
        addbutton.frame = CGRectMake(80.0f, 130.0f, 25.0f, 25.0f);
        [self.view addSubview:addbutton];
    }

    
    UIButton *discbutton = [UIButton buttonWithType:UIButtonTypeDetailDisclosure];
    if (discbutton != nil)
    {
        discbutton.frame = CGRectMake(80.0f, 100.0f, 25.0f, 25.0f);
        [self.view addSubview:discbutton];
    }

    
    
    UIButton *button = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    if (button != nil)
    {
        button.frame = CGRectMake(20.0f, 10.0f, 100.0f, 50.0f);
        button.tintColor = [UIColor redColor];
        [button setTitle: @"Push Me" forState:UIControlStateNormal];
        [button setTitle: @"Pushed" forState:UIControlStateHighlighted];
        [self.view addSubview:button];
    }
     */
    
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)onClick: (UIButton*)button
{
    
    if (button.tag == BUTTON_LOGIN){
    }
    else if (button.tag == BUTTON_DATE)
    {
        UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"Date" message:@"Date Info" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
        if (alertView != nil)
        {
            [alertView show];
        }
    }
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
