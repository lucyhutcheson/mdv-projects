//
//  ViewController.m
//  weekOne
//
//  Created by Lucy Hutcheson on 9/26/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "ViewController.h"
#import "CookieFactory.h"
#import "ChocolateChip.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    
    self.view.backgroundColor = [UIColor whiteColor];
    
    // Labels for classes
    
    //Chocolate Chip Label
    ChocoLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 3, 320, 70)];
    ChocoLabel.backgroundColor = [UIColor lightGrayColor];
    ChocoLabel.textColor = [UIColor blackColor];
    ChocoLabel.textAlignment = UITextAlignmentCenter;
    ChocoLabel.numberOfLines = 3;
    [self.view addSubview:ChocoLabel];
    
    //Chocolate Chip Label Part Two
    ChocoLabelTwo = [[UILabel alloc] initWithFrame:CGRectMake(0, 76, 320, 70)];
    ChocoLabelTwo.backgroundColor = [UIColor magentaColor];
    ChocoLabelTwo.textColor = [UIColor whiteColor];
    ChocoLabelTwo.textAlignment = UITextAlignmentCenter;
    ChocoLabelTwo.numberOfLines = 3;
    [self.view addSubview:ChocoLabelTwo];
    
    //Oatmeal Label
    OatmealLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 150, 320, 70)];
    OatmealLabel.backgroundColor = [UIColor lightGrayColor];
    OatmealLabel.textColor = [UIColor blackColor];
    OatmealLabel.textAlignment = UITextAlignmentCenter;
    OatmealLabel.numberOfLines = 3;
    [self.view addSubview:OatmealLabel];
    
    //Oatmeal Label Two
    OatmealLabelTwo = [[UILabel alloc] initWithFrame:CGRectMake(0, 224, 320, 70)];
    OatmealLabelTwo.backgroundColor = [UIColor magentaColor];
    OatmealLabelTwo.textColor = [UIColor whiteColor];
    OatmealLabelTwo.textAlignment = UITextAlignmentCenter;
    OatmealLabelTwo.numberOfLines = 3;
    [self.view addSubview:OatmealLabelTwo];
    
    //Snickerdoodle Label
    SnickerLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 299, 320, 80)];
    SnickerLabel.backgroundColor = [UIColor lightGrayColor];
    SnickerLabel.textColor = [UIColor blackColor];
    SnickerLabel.textAlignment = UITextAlignmentCenter;
    SnickerLabel.numberOfLines = 4;
    [self.view addSubview:SnickerLabel];
    
    //Snickerdoodle Label Part two
    SnickerLabelTwo =[[UILabel alloc] initWithFrame:CGRectMake(0, 383, 320, 70)];
    SnickerLabelTwo.backgroundColor = [UIColor magentaColor];
    SnickerLabelTwo.textColor = [UIColor whiteColor];
    SnickerLabelTwo.textAlignment = UITextAlignmentCenter;
    SnickerLabelTwo.numberOfLines = 3;
    [self.view addSubview:SnickerLabelTwo];

    
    //Create Chocolate Chip Cookies
    BaseRecipe *chocolatechip = [CookieFactory GetCookie:CHOCOLATECHIP];
    if (chocolatechip != nil)
    {
        [chocolatechip setChipNumber:20];
        ChocoLabel.text = [NSString stringWithFormat:@"This is my %@ cookie with a total of %d chocolate chips and it weighs %.2f oz.", [chocolatechip getCookieName], [chocolatechip getChipNumber], [chocolatechip getbaseWeight]];
    }
    
    BaseRecipe *chocolatechipoatmeal = [CookieFactory GetCookie:CHOCOLATECHIPOATMEAL];
    if (chocolatechipoatmeal != nil)
    {
        OatmealLabel.text = [NSString stringWithFormat:@"This is my %@ cookie with a total of %d chocolate chips and it weighs %.2f oz.", [chocolatechipoatmeal getCookieName], [chocolatechipoatmeal getChipNumber], [chocolatechipoatmeal getbaseWeight]];
    }
    
    BaseRecipe *snickerdoodle = [CookieFactory GetCookie:SNICKERDOODLE];
    if (snickerdoodle != nil)
    {
        SnickerLabel.text = [NSString stringWithFormat:@"This is my %@ cookie with a total of %d chocolate chips and it weighs %.2f oz.", [snickerdoodle getCookieName], [snickerdoodle getChipNumber], [snickerdoodle calculateCookieWeight]];
    }

    //Static Labels
    //Chocolate Chip
    BOOL sugarfree = true;
    if (sugarfree == true)
    {
        ChocoLabelTwo.text = [NSString stringWithFormat:@"This %@ cookie is sugar free!", [chocolatechip getCookieName]];
    }
    else {
        ChocoLabelTwo.text = [NSString stringWithFormat:@"This %@ cookie is not sugar free. Sorry.", [chocolatechip getCookieName]];
    }
    
    //Oatmeal
    BOOL raisins = false;
    if (raisins == false)
    {
        OatmealLabelTwo.text = [NSString stringWithFormat:@"This %@ cookie does not contain raisins.", [chocolatechipoatmeal getCookieName]];
    }
    else {
        OatmealLabelTwo.text = [NSString stringWithFormat:@"This %@ cookie is actually an Oatmeal Raisin cookie.", [chocolatechipoatmeal getCookieName]];
    }

    //Snickerdoodle
    BOOL mms = true;
    if (mms == true)
    {
        SnickerLabelTwo.text = [NSString stringWithFormat:@"This %@ cookie is also available with M&Ms!", [snickerdoodle getCookieName]];
    }
    else {
        SnickerLabelTwo.text = [NSString stringWithFormat:@"Sorry, this %@ cookie does not have M&Ms.", [snickerdoodle getCookieName]];
    }

    
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
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
