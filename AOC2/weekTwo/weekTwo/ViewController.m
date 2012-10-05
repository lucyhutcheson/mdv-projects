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
    // Since calculator is default "on", set the display to 0
    displayField.text = @"0";
    
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}



/*------------------------------------------------------------------------------------------ *
   A on/off switch must be present. When the switch is in the off position, no input is 
   accepted. When the switch is in moved to the on position, all operands and operators 
   input previously should be cleared.         
 *------------------------------------------------------------------------------------------ */

-(IBAction)onSwitched:(id)sender
{
    UISwitch *onOffSwitch = (UISwitch*)sender;
    
    if (onOffSwitch != nil)
    {
        if (onOffSwitch.on)
        {
            displayField.text = @"0";
            myResults = 0;
            myNumber = 0;
        }
        else
        {
            displayField.text = @"";
        }
    }
}



/*------------------------------------------------------------------------------------------ *
    The calculator must contain the numbers 0 to 9. No decimal button is needed.
 *------------------------------------------------------------------------------------------ */

-(IBAction)numPressed:(id)sender
{
    if (onSwitch.on != false)
    {
        UIButton *number = (UIButton*)sender;
        if (number != nil)
        {
            myNumber = number.tag;
            displayField.text = [NSString stringWithFormat:@"%d", myNumber];
        }
    }
}



/*------------------------------------------------------------------------------------------ *
    A plus button must be present.
    An equal button must be present and trigger the add calculation using the two operands.
 *------------------------------------------------------------------------------------------ */

-(IBAction)calcOperator:(id)sender
{
    if (onSwitch.on != false)
    {
        UIButton *calcOp = (UIButton*)sender;
        if (calcOp != nil)
        {
            int operation = calcOp.tag;
            if (operation == 1)
            {
                myResults = myNumber;
            }
            else
            {
                if (myNumber != 0)
                {
                    myResults = myResults + myNumber;
                }
                else
                {
                    myResults = myNumber;
                }
                displayField.text = [NSString stringWithFormat:@"%d", myResults];
                myNumber = 0;
                myResults = 0;
                
            }
        }
    }
}



/*------------------------------------------------------------------------------------------ *
    A clear button should be present. The clear button will clear an inputted operands 
    and operators putting the calculator into a clean state.
 *------------------------------------------------------------------------------------------ */

-(IBAction)clearOperator:(id)sender
{
    if (onSwitch.on != false)
    {
        UIButton *clearOp = (UIButton*)sender;
        if (clearOp != nil)
        {
            myResults = 0;
            myNumber = 0;
            displayField.text = @"0";
        }
    }
}



/*------------------------------------------------------------------------------------------ *
    Include an info button that will display a second view containing your name.
 *------------------------------------------------------------------------------------------ */

-(IBAction)onClick:(id)sender
{
    SecondViewController *viewController = [[SecondViewController alloc] initWithNibName:@"SecondView" bundle:nil];
    
    if (viewController != nil)
    {
        [self presentViewController:viewController animated:YES completion:nil];
    }
}



/*------------------------------------------------------------------------------------------ *
    Add a section using a segmented control that allows for the background color of the 
    view to change from the default white to blue or green.
 *------------------------------------------------------------------------------------------ */

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
