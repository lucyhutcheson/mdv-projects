//
//  ViewController.h
//  weekTwo
//
//  Created by Lucy Hutcheson on 10/3/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController
{
    // Setup my fields and variables that I will need
    IBOutlet UISwitch *onSwitch;
    IBOutlet UITextField *displayField;
    int myResults;
    int myNumber;
}


// Setup my IBActions for my calculator
-(IBAction)onSwitched:(id)sender;
-(IBAction)onClick:(id)sender;
-(IBAction)onChange:(id)sender;
-(IBAction)numPressed:(id)sender;
-(IBAction)calcOperator:(id)sender;
-(IBAction)clearOperator:(id)sender;

@end
