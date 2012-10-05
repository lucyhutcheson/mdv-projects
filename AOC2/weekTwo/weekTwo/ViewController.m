//
//  ViewController.m
//  weekTwo
//
//  Created by Lucy Hutcheson on 10/3/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "ViewController.h"
#import "SecondViewController.h"


@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    displayField.text = @"0";
    
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}


-(IBAction)onSwitched:(id)sender
{
    
    UISwitch *onOffSwitch = (UISwitch*)sender;
    
    if (onOffSwitch != nil)
    {
        if (onOffSwitch.on)
        {
            displayField.text = @"0";
            NSLog(@"It is on");
        }
        else
        {
            displayField.text = @"";
            NSLog(@"It is off");
        }
    }
}


-(IBAction)numPressed:(id)sender
{
    if (onSwitch.on != false)
    {
        UIButton *number = (UIButton*)sender;
        if (number != nil)
        {
            int myNumber = number.tag;
            displayField.text = [NSString stringWithFormat:@"%d", myNumber];
        }
    }
}






-(IBAction)onClick:(id)sender
{
    SecondViewController *viewController = [[SecondViewController alloc] initWithNibName:@"SecondView" bundle:nil];
    
    if (viewController != nil)
    {
        [self presentViewController:viewController animated:YES completion:nil];
    }
}

-(IBAction)onChange:(id)sender
{
    UISegmentedControl *segControl = (UISegmentedControl*)sender;
    if(segControl != nil)
    {
        int selectedIndex = segControl.selectedSegmentIndex;
        if (selectedIndex == 0)
        {
            self.view.backgroundColor = [UIColor whiteColor];
        }
        else if (selectedIndex == 1)
        {
            self.view.backgroundColor = [UIColor colorWithRed:0.714 green:0.812 blue:0.827 alpha:1] /* #b6cfd3 */;
        }
        else if (selectedIndex == 2)
        {
            self.view.backgroundColor = [UIColor colorWithRed:182.0f/255.0f green:202.0f/255.0f blue:166.0f/255.0f alpha:1.0f] /* #bacaa6 */;
        }
        else
        {
            // Do Nothing
        }
    }
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
