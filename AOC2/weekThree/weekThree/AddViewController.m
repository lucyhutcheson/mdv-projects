//
//  AddViewController.m
//  weekThree
//
//  Created by Lucy Hutcheson on 10/8/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "AddViewController.h"

@interface AddViewController ()

@end

@implementation AddViewController

@synthesize delegate;


- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        delegate = nil;
        // Custom initialization
    }
    return self;
}

- (BOOL)textFieldShouldBeginEditing:(UITextField *)textField
{
    textField.text = @"";
    return true;
}


- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view.
}

-(IBAction)saveEvent:(id)sender
{
    [self dismissViewControllerAnimated:YES completion:nil];
}

-(IBAction)closeKeyboard:(id)sender
{
    UIButton *closeButton = (UIButton*)sender;

    [closeButton resignFirstResponder];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
